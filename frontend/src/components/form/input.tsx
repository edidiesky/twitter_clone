import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled as styleds } from '@mui/material/styles';

const InputTextField = styleds(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--border1)',
    fontFamily: "CustomFont_Normal, sans-serif",


    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused ': {
      border: '2px solid var(--blue-1)',
    },
  },
  '& .MuiOutlinedInput-input': {
    marginTop: "10px",
    fontSize: '16px',
    fontWeight: 'Normal',
    fontFamily: "CustomFont_Normal, sans-serif",
    lineHeight:"1.15",
    color: "var(--dark-1)"

  },
  '& .MuiInputLabel-root': {
    fontSize: '16px',
    fontWeight: 'Normal',
    color: 'var(--dark-1)'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    // Styles when the form is focused
    color: 'var(--dark-1)',
    fontWeight: 'Normal',
    fontFamily: "CustomFont_Normal, sans-serif",

  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(12px, 7px) scale(0.8)',
    color: 'var(--dark-1)', fontWeight: "normal"
  },
}));

const AreaTextField = styleds(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--border1)',
    fontFamily: "CustomFont_Normal, sans-serif",


    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused ': {
      border: '2px solid var(--blue-1)',
    },
  },
  '& .MuiOutlinedInput-input': {
    marginTop: "10px",
    fontSize: '17px',
    fontWeight: 'Normal',
    fontFamily: "CustomFont_Normal, sans-serif",
    lineHeight: "1.15",
    color: "var(--dark-1)"

  },
  '& .MuiInputLabel-root': {
    fontSize: '17px',
    fontWeight: 'Normal',
    color: 'var(--dark-1)'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    // Styles when the form is focused
    color: 'var(--dark-1)',
    fontWeight: 'Normal',
    fontFamily: "CustomFont_Normal, sans-serif",

  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, 7px) scale(0.8)',
    color: 'var(--dark-1)', fontWeight: "normal"
  },
}));



type EditInput = {
  types?: String
}

type EditInputTypes = {
  state?: string;
  label?: string;
  type?: string;
  required?: boolean;
  setState?: (val: string) => void;
};

type FormInputProps = EditInput & EditInputTypes;


const FormInput: React.FC<FormInputProps> = ({ types, type, setState, 
  state, label, required }) => {
  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      setState(e.target.value);
    }
  }
  if (types === 'textarea') {
    return (
      <AreaTextField
        label={label}
        type={type}
        variant="outlined"
        fullWidth
        value={state}
        onChange={handleFormInput}
        multiline={types === 'textarea'}
      />
    );
  }

  return (
    <InputTextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      required={required}
      value={state}
      onChange={handleFormInput}
      multiline={types === ''}

    />
  );

 
};

export default FormInput;
