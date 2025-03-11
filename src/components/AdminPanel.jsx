import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createPuzzle, deletePuzzle } from "../graphql/mutations";
import { listPuzzles } from "../graphql/queries";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { generateFunFacts } from "../utils/geminiAI";

// List of admin emails
export const ADMIN_EMAILS = [
  "umdgeoguesser@gmail.com",
  "ctgchris3@gmail.com", 
  "ctgchris4@gmail.com"
];

// Form validation constants
const VALIDATION_RULES = {
  lat: { min: -90, max: 90 },
  lng: { min: -180, max: 180 },
  hintRadius: { min: 10, max: 10000 },
};

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    date: "",
    imageFile: null,
    actualLat: "",
    actualLng: "",
    hintRadius: "",
    difficulty: "medium",
    imageDescription: "",
    funFacts: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isGeneratingFacts, setIsGeneratingFacts] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Check if user is authorized
  useEffect(() => {
    const checkAuth = async () => {
      if (!currentUser) {
        navigate('/');
        return;
      }

      const userEmail = currentUser.attributes?.email;
      
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        console.log("Unauthorized access attempt from:", userEmail);
        navigate('/');
        return;
      }

      setIsAdmin(true);
    };

    checkAuth();
  }, [currentUser, navigate]);

  const validateForm = () => {
    const errors = {};
    
    // Date validation
    if (!formState.date) {
      errors.date = "Date is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formState.date)) {
      errors.date = "Date must be in YYYY-MM-DD format";
    } else {
      // Check if it's a valid date
      const [year, month, day] = formState.date.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        errors.date = "Invalid date";
      }
    }

    // Image validation
    if (!formState.imageFile) {
      errors.imageFile = "Image is required";
    }

    // Latitude validation
    const lat = parseFloat(formState.actualLat);
    if (isNaN(lat)) {
      errors.actualLat = "Latitude must be a number";
    } else if (lat < VALIDATION_RULES.lat.min || lat > VALIDATION_RULES.lat.max) {
      errors.actualLat = `Latitude must be between ${VALIDATION_RULES.lat.min} and ${VALIDATION_RULES.lat.max}`;
    }

    // Longitude validation
    const lng = parseFloat(formState.actualLng);
    if (isNaN(lng)) {
      errors.actualLng = "Longitude must be a number";
    } else if (lng < VALIDATION_RULES.lng.min || lng > VALIDATION_RULES.lng.max) {
      errors.actualLng = `Longitude must be between ${VALIDATION_RULES.lng.min} and ${VALIDATION_RULES.lng.max}`;
    }

    // Hint radius validation
    const radius = parseInt(formState.hintRadius, 10);
    if (isNaN(radius)) {
      errors.hintRadius = "Hint radius must be a number";
    } else if (radius < VALIDATION_RULES.hintRadius.min || radius > VALIDATION_RULES.hintRadius.max) {
      errors.hintRadius = `Hint radius must be between ${VALIDATION_RULES.hintRadius.min} and ${VALIDATION_RULES.hintRadius.max} meters`;
    }

    // Description validation
    if (!formState.imageDescription.trim()) {
      errors.imageDescription = "Image description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormState(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenerateFunFacts = async () => {
    if (!formState.imageDescription) {
      setMessage({ type: "error", text: "Please enter an image description first." });
      return;
    }

    setIsGeneratingFacts(true);
    try {
      const facts = await generateFunFacts(formState.imageDescription);
      if (facts) {
        setFormState(prev => ({ ...prev, funFacts: facts }));
        setMessage({ type: "success", text: "Fun facts generated successfully!" });
      }
    } catch (error) {
      console.error("Error generating fun facts:", error);
      setMessage({ type: "error", text: "Error generating fun facts. Please try again." });
    } finally {
      setIsGeneratingFacts(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the form errors before submitting." });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if a puzzle already exists for this date
      const existingPuzzle = await API.graphql(
        graphqlOperation(listPuzzles, {
          filter: { id: { eq: formState.date } }
        })
      );

      // Handle existing puzzle
      if (existingPuzzle.data.listPuzzles.items.length > 0) {
        const shouldOverride = window.confirm(
          "A puzzle already exists for this date. Would you like to override it? This action cannot be undone."
        );
        
        if (!shouldOverride) {
          setMessage({ type: "info", text: "Operation cancelled. Please choose a different date or confirm override." });
          setIsSubmitting(false);
          return;
        }

        try {
          await handleExistingPuzzleDeletion(existingPuzzle.data.listPuzzles.items[0]);
        } catch (deleteError) {
          console.error("Error deleting existing puzzle:", deleteError);
          setMessage({ type: "error", text: "Error deleting existing puzzle. Please try again." });
          setIsSubmitting(false);
          return;
        }
      }

      // Upload new image and create puzzle
      await createNewPuzzle();
      
      setMessage({ 
        type: "success", 
        text: existingPuzzle.data.listPuzzles.items.length > 0 
          ? "Puzzle successfully overridden!"
          : "Puzzle created successfully!"
      });
      
      resetForm();
    } catch (error) {
      console.error("Error creating/updating puzzle:", error);
      const errorMessage = error.errors?.[0]?.message || error.message || "Unknown error occurred";
      setMessage({ type: "error", text: `Error creating/updating puzzle: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExistingPuzzleDeletion = async (existingPuzzleData) => {
    try {
      const existingImageKey = existingPuzzleData.imageUrl.split('/').pop();
      await Storage.remove(existingImageKey);
    } catch (imageError) {
      console.warn("Could not delete old image:", imageError);
    }

    await API.graphql(
      graphqlOperation(deletePuzzle, { input: { id: existingPuzzleData.id } })
    );

    
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const createNewPuzzle = async () => {
    const imageKey = `${formState.date}-${formState.imageFile.name.replace(/\s/g, '_')}`;
    await Storage.put(imageKey, formState.imageFile, {
      contentType: formState.imageFile.type,
      level: "public",
    });

    const bucketName = "umd-geoguesser-images00824-prod";
    const region = "us-east-1";
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/public/${imageKey}`;

    const puzzleInput = {
      id: formState.date,
      date: formState.date,
      imageUrl,
      actualLat: parseFloat(formState.actualLat),
      actualLng: parseFloat(formState.actualLng),
      hintRadius: parseInt(formState.hintRadius, 10),
      difficulty: formState.difficulty,
      imageDescription: formState.imageDescription,
      aiFunFacts: formState.funFacts || null,
    };

    await API.graphql(
      graphqlOperation(createPuzzle, { input: puzzleInput })
    );
  };

  const resetForm = () => {
    setFormState({
      date: "",
      imageFile: null,
      actualLat: "",
      actualLng: "",
      hintRadius: "",
      difficulty: "medium",
      imageDescription: "",
      funFacts: "",
    });
    setFormErrors({});
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">
          Logged in as admin: {currentUser?.attributes?.email}
        </p>
      </div>

      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Puzzle</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Date (YYYY-MM-DD):</label>
            <input
              type="text"
              name="date"
              value={formState.date}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              className={`w-full p-2 border rounded ${formErrors.date ? 'border-red-500' : ''}`}
            />
            {formErrors.date && <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>}
            <p className="text-gray-500 text-xs mt-1">Format: YYYY-MM-DD (e.g., 2024-03-10)</p>
          </div>

          <div>
            <label className="block text-sm">Image File:</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${formErrors.imageFile ? 'border-red-500' : ''}`}
            />
            {formErrors.imageFile && <p className="text-red-500 text-sm mt-1">{formErrors.imageFile}</p>}
          </div>

          <div>
            <label className="block text-sm">Actual Latitude:</label>
            <input
              type="number"
              name="actualLat"
              value={formState.actualLat}
              onChange={handleInputChange}
              step="any"
              min={VALIDATION_RULES.lat.min}
              max={VALIDATION_RULES.lat.max}
              className={`w-full p-2 border rounded ${formErrors.actualLat ? 'border-red-500' : ''}`}
            />
            {formErrors.actualLat && <p className="text-red-500 text-sm mt-1">{formErrors.actualLat}</p>}
          </div>

          <div>
            <label className="block text-sm">Actual Longitude:</label>
            <input
              type="number"
              name="actualLng"
              value={formState.actualLng}
              onChange={handleInputChange}
              step="any"
              min={VALIDATION_RULES.lng.min}
              max={VALIDATION_RULES.lng.max}
              className={`w-full p-2 border rounded ${formErrors.actualLng ? 'border-red-500' : ''}`}
            />
            {formErrors.actualLng && <p className="text-red-500 text-sm mt-1">{formErrors.actualLng}</p>}
          </div>

          <div>
            <label className="block text-sm">Hint Radius (in meters):</label>
            <input
              type="number"
              name="hintRadius"
              value={formState.hintRadius}
              onChange={handleInputChange}
              min={VALIDATION_RULES.hintRadius.min}
              max={VALIDATION_RULES.hintRadius.max}
              className={`w-full p-2 border rounded ${formErrors.hintRadius ? 'border-red-500' : ''}`}
            />
            {formErrors.hintRadius && <p className="text-red-500 text-sm mt-1">{formErrors.hintRadius}</p>}
          </div>

          <div>
            <label className="block text-sm">Difficulty:</label>
            <select
              name="difficulty"
              value={formState.difficulty}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Location Description:</label>
              <textarea
                name="imageDescription"
                value={formState.imageDescription}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${formErrors.imageDescription ? 'border-red-500' : ''}`}
                rows="3"
                placeholder="Describe the location in the image..."
              />
              {formErrors.imageDescription && <p className="text-red-500 text-sm mt-1">{formErrors.imageDescription}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">AI Generated Location Summary:</label>
                <button
                  type="button"
                  onClick={handleGenerateFunFacts}
                  disabled={isGeneratingFacts || !formState.imageDescription}
                  className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm ${
                    isGeneratingFacts || !formState.imageDescription ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isGeneratingFacts ? 'Generating...' : 'Generate Fun Facts'}
                </button>
              </div>
              <div className={`border rounded p-4 ${formState.funFacts ? 'bg-blue-50' : 'bg-gray-50'}`}>
                {formState.funFacts ? (
                  <div className="prose">
                    {formState.funFacts}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Summary of location will appear here after AI generation
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating Puzzle...' : 'Create Puzzle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
