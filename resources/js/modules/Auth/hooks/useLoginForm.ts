// resources/js/hooks/useLoginForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData } from '../types/authTypes';
import { loginSchema } from '../schemas/authSchemas';
import { loginUser } from '../services/loginUser';
import { useAuthStore } from '@/core/stores/authStore';


export const useLoginForm = () => {
  const {register,handleSubmit,formState: { errors, isSubmitting },setError,} = useForm<LoginFormData>({resolver: zodResolver(loginSchema),mode: 'onChange',});

  const onSubmit = async (data: LoginFormData) => {
    try {
        await loginUser(data)
        useAuthStore.getState().setIsAuthenticated()
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
  };
};
