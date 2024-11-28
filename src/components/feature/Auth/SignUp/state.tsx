import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Alert} from 'react-native';

import useApi from '$/src/hooks/api';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateRetypePassword,
} from '$/src/lib/utils/input-validation';

type Gender = 'M' | 'F';

export type FormField = {value: string | Gender; error: string};

interface FormContextProps {
  firstname: FormField;
  referee: FormField;
  gender: FormField;
  setReferee: React.Dispatch<React.SetStateAction<FormField>>;
  setGender: React.Dispatch<React.SetStateAction<FormField>>;
  setFirstname: React.Dispatch<React.SetStateAction<FormField>>;
  lastname: FormField;
  setLastname: React.Dispatch<React.SetStateAction<FormField>>;
  email: FormField;
  setEmail: React.Dispatch<React.SetStateAction<FormField>>;
  // phoneNumber: FormField;
  phoneNumber: string;
  // setPhoneNumber: React.Dispatch<React.SetStateAction<FormField>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  dateOfBirth: FormField;
  setDateOfBirth: React.Dispatch<React.SetStateAction<FormField>>;
  anniversary: FormField;
  setAnniversary: React.Dispatch<React.SetStateAction<FormField>>;
  password: FormField;
  setPassword: React.Dispatch<React.SetStateAction<FormField>>;
  retypePassword: FormField;
  setRetypePassword: React.Dispatch<React.SetStateAction<FormField>>;
  passwordCorrect: boolean;
  handleSignUpPress: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({children}: {children: ReactNode}) => {
  const {signup} = useApi().auth;

  const [firstname, setFirstname] = useState<FormField>({
    value: '',
    error: '',
  });
  const [lastname, setLastname] = useState<FormField>({
    value: '',
    error: '',
  });
  const [referee, setReferee] = useState<FormField>({
    value: '',
    error: '',
  });
  const [gender, setGender] = useState<FormField>({
    value: '',
    error: '',
  });
  const [email, setEmail] = useState<FormField>({
    value: '',
    error: '',
  });
  const [dateOfBirth, setDateOfBirth] = useState<FormField>({
    value: new Date().toString(),
    error: '',
  });
  const [anniversary, setAnniversary] = useState<FormField>({
    value: new Date().toString(),
    error: '',
  });

  const [password, setPassword] = useState<FormField>({
    value: '',
    error: '',
  });
  const [retypePassword, setRetypePassword] = useState<FormField>({
    value: '',
    error: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  //  const [phoneNumber, setPhoneNumber] = useState<FormField>({
  //    value: '',
  //    error: '',
  //  });
  const [phoneNumber, setPhoneNumber] = useState('');

  const passwordCorrect =
    retypePassword.value !== '' && retypePassword.value === password.value;

  const handleSignUpPress = useCallback(async () => {
    const firstNameValidation = validateName(firstname.value);
    const lastNameValidation = validateName(lastname.value);
    const emailValidation = validateEmail(email.value);
    const passwordValidation = validatePassword(password.value);
    // const phoneNumberValidation = validatePhoneNumber(phoneNumber.value);

    const retypePasswordValidation = validateRetypePassword(
      password.value,
      retypePassword.value,
    );

    // console.log({phoneNumberValidation});

    setFirstname(firstNameValidation);
    setLastname(lastNameValidation);
    setEmail(emailValidation);
    setPassword(passwordValidation);
    setRetypePassword(retypePasswordValidation);
    // setPhoneNumber(phoneNumberValidation);

    // if (
    //   firstNameValidation.error ||
    //   lastNameValidation.error ||
    //   emailValidation.error ||
    //   passwordValidation.error ||
    //   retypePasswordValidation.error
    // )
    //   return;
    setLoading(true);
    await signup(
      {
        email: email.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
        // phoneNumber: phoneNumber.value
        phoneNumber,
        anniversary: anniversary.value,
        dateOfBirth: dateOfBirth.value,
        gender: gender.value,
        referee: referee.value,
      },
      () => {},
    );
    setLoading(false);
  }, [
    email.value,
    firstname.value,
    lastname.value,
    password.value,
    // phoneNumber.value,
    phoneNumber,
    anniversary.value,
    dateOfBirth.value,
    retypePassword.value,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setRetypePassword,
    setPhoneNumber,
    setAnniversary,
    setDateOfBirth,
    signup,
  ]);

  return (
    <FormContext.Provider
      value={{
        referee,
        setReferee,
        setGender,
        gender,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        password,
        setPassword,
        retypePassword,
        setRetypePassword,
        passwordCorrect,
        anniversary,
        dateOfBirth,
        setAnniversary,
        setDateOfBirth,
        handleSignUpPress,
        loading,
        setLoading,
      }}>
      {children}
    </FormContext.Provider>
  );
};
