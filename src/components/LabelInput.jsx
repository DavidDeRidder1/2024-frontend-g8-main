import { useFormContext } from "react-hook-form";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  placeholder,

  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  if (!placeholder) {
    placeholder = name;
  }
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        rounded={100}
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        placeholder={placeholder}
        {...rest}
      />
      {hasError ? (
        <Text color="red" data-cy="label_input_error">
          {errors[name].message}
        </Text>
      ) : null}
    </FormControl>
  );
}
