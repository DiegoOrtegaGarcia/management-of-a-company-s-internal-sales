// resources/js/hooks/useRegisterForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData } from '../types/authTypes';
import { registerSchema } from '../schemas/authSchemas';
import { registerUser } from '../services/registerUser';

export const useRegisterForm = () => {
  const {register,handleSubmit,formState: { errors, isSubmitting, isValid },setError,watch,} = useForm<RegisterFormData>({resolver: zodResolver(registerSchema),mode: 'onChange',});

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
      window.location.href = '/login';
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    }
  };


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
    password,
  };
};
