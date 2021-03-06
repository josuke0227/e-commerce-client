import AuthCardLayout from "./shared/AuthCardLayout";
import ButtonWithLoader from "./shared/ButtonWIthLoader";
import TextInputGenerator from "./shared/TextInputGenerator";

const ActivationForm = ({
  createUserError,
  data,
  email,
  error,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  const shouldDisable = () =>
    error.password === "" ||
    error.confirmingPassword === "" ||
    !!error.password.length ||
    !!error.confirmingPassword.length;

  const textInputDefinitions = [
    {
      disabled: true,
      id: "email",
      label: "your email address",
      value: email,
    },
    {
      autoFocus: true,
      error: !!error.password.length,
      helperText: !!error.password && error.password,
      id: "password",
      label: "enter password",
      onChange: handleInputChange,
      type: "password",
      value: data.password,
    },
    {
      error: !!error.confirmingPassword.length,
      helperText: !!error.confirmingPassword && error.confirmingPassword,
      id: "confirmingPassword",
      label: "confirm password",
      onChange: handleInputChange,
      type: "password",
      value: data.confirmingPassword,
    },
  ];

  const formContents = {
    title: "Please set password",
    textInputs: <TextInputGenerator definitions={textInputDefinitions} />,
    alert: { message: createUserError, severity: "error" },
    submitButton: (
      <ButtonWithLoader
        label="Submit"
        handleSubmit={handleSubmit}
        loading={loading}
        disabled={shouldDisable()}
      />
    ),
  };

  return <AuthCardLayout contents={formContents} />;
};

export default ActivationForm;
