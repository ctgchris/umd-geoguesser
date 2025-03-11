/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createPuzzle } from "../graphql/mutations";
export default function PuzzleCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    imageUrl: "",
    actualLat: "",
    actualLng: "",
    hintRadius: "",
    difficulty: "",
    imageDescription: "",
    aiFunFacts: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [actualLat, setActualLat] = React.useState(initialValues.actualLat);
  const [actualLng, setActualLng] = React.useState(initialValues.actualLng);
  const [hintRadius, setHintRadius] = React.useState(initialValues.hintRadius);
  const [difficulty, setDifficulty] = React.useState(initialValues.difficulty);
  const [imageDescription, setImageDescription] = React.useState(
    initialValues.imageDescription
  );
  const [aiFunFacts, setAiFunFacts] = React.useState(initialValues.aiFunFacts);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setImageUrl(initialValues.imageUrl);
    setActualLat(initialValues.actualLat);
    setActualLng(initialValues.actualLng);
    setHintRadius(initialValues.hintRadius);
    setDifficulty(initialValues.difficulty);
    setImageDescription(initialValues.imageDescription);
    setAiFunFacts(initialValues.aiFunFacts);
    setErrors({});
  };
  const validations = {
    date: [{ type: "Required" }],
    imageUrl: [{ type: "Required" }],
    actualLat: [{ type: "Required" }],
    actualLng: [{ type: "Required" }],
    hintRadius: [{ type: "Required" }],
    difficulty: [],
    imageDescription: [],
    aiFunFacts: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          date,
          imageUrl,
          actualLat,
          actualLng,
          hintRadius,
          difficulty,
          imageDescription,
          aiFunFacts,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createPuzzle.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PuzzleCreateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              imageUrl,
              actualLat,
              actualLng,
              hintRadius,
              difficulty,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Image url"
        isRequired={true}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              imageUrl: value,
              actualLat,
              actualLng,
              hintRadius,
              difficulty,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
      ></TextField>
      <TextField
        label="Actual lat"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={actualLat}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat: value,
              actualLng,
              hintRadius,
              difficulty,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.actualLat ?? value;
          }
          if (errors.actualLat?.hasError) {
            runValidationTasks("actualLat", value);
          }
          setActualLat(value);
        }}
        onBlur={() => runValidationTasks("actualLat", actualLat)}
        errorMessage={errors.actualLat?.errorMessage}
        hasError={errors.actualLat?.hasError}
        {...getOverrideProps(overrides, "actualLat")}
      ></TextField>
      <TextField
        label="Actual lng"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={actualLng}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat,
              actualLng: value,
              hintRadius,
              difficulty,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.actualLng ?? value;
          }
          if (errors.actualLng?.hasError) {
            runValidationTasks("actualLng", value);
          }
          setActualLng(value);
        }}
        onBlur={() => runValidationTasks("actualLng", actualLng)}
        errorMessage={errors.actualLng?.errorMessage}
        hasError={errors.actualLng?.hasError}
        {...getOverrideProps(overrides, "actualLng")}
      ></TextField>
      <TextField
        label="Hint radius"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={hintRadius}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat,
              actualLng,
              hintRadius: value,
              difficulty,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.hintRadius ?? value;
          }
          if (errors.hintRadius?.hasError) {
            runValidationTasks("hintRadius", value);
          }
          setHintRadius(value);
        }}
        onBlur={() => runValidationTasks("hintRadius", hintRadius)}
        errorMessage={errors.hintRadius?.errorMessage}
        hasError={errors.hintRadius?.hasError}
        {...getOverrideProps(overrides, "hintRadius")}
      ></TextField>
      <TextField
        label="Difficulty"
        isRequired={false}
        isReadOnly={false}
        value={difficulty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat,
              actualLng,
              hintRadius,
              difficulty: value,
              imageDescription,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.difficulty ?? value;
          }
          if (errors.difficulty?.hasError) {
            runValidationTasks("difficulty", value);
          }
          setDifficulty(value);
        }}
        onBlur={() => runValidationTasks("difficulty", difficulty)}
        errorMessage={errors.difficulty?.errorMessage}
        hasError={errors.difficulty?.hasError}
        {...getOverrideProps(overrides, "difficulty")}
      ></TextField>
      <TextField
        label="Image description"
        isRequired={false}
        isReadOnly={false}
        value={imageDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat,
              actualLng,
              hintRadius,
              difficulty,
              imageDescription: value,
              aiFunFacts,
            };
            const result = onChange(modelFields);
            value = result?.imageDescription ?? value;
          }
          if (errors.imageDescription?.hasError) {
            runValidationTasks("imageDescription", value);
          }
          setImageDescription(value);
        }}
        onBlur={() => runValidationTasks("imageDescription", imageDescription)}
        errorMessage={errors.imageDescription?.errorMessage}
        hasError={errors.imageDescription?.hasError}
        {...getOverrideProps(overrides, "imageDescription")}
      ></TextField>
      <TextField
        label="Ai fun facts"
        isRequired={false}
        isReadOnly={false}
        value={aiFunFacts}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              imageUrl,
              actualLat,
              actualLng,
              hintRadius,
              difficulty,
              imageDescription,
              aiFunFacts: value,
            };
            const result = onChange(modelFields);
            value = result?.aiFunFacts ?? value;
          }
          if (errors.aiFunFacts?.hasError) {
            runValidationTasks("aiFunFacts", value);
          }
          setAiFunFacts(value);
        }}
        onBlur={() => runValidationTasks("aiFunFacts", aiFunFacts)}
        errorMessage={errors.aiFunFacts?.errorMessage}
        hasError={errors.aiFunFacts?.hasError}
        {...getOverrideProps(overrides, "aiFunFacts")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
