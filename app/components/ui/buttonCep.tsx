import React from 'react'
import InputUi from './InputDefault/input'
import { SlArrowRightCircle } from 'react-icons/sl'
import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
type Inputs = {
    cep: string;
  };
  const schema = yup.object().shape({
    cep: yup.string().required("This field is required!"),
  });

function ButtonCep() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({ resolver: yupResolver(schema) });
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const cep = data.cep;
        try {
          alert("cep pesquisado");
        } catch (error) {
          alert("cep nao pesquisado");
        } finally {
        }
      };

  return (
    <form className="flex-col mt-4">
    <div className="w-full flex gap-2 items-center relative">
      <div className="flex w-full flex-col">
        <InputUi
          type="text"
          pleaceholder="00000-000"
          label="calculate shipping"
          name="cep"
          register={register}
        />
      </div>
      <button
        type="submit"
        className="py-3.5 rounded-sm absolute right-4 top-7 z-10 flex items-center justify-center text-2xl"
      >
        <SlArrowRightCircle />
      </button>
    </div>
  </form>
  )
}

export default ButtonCep