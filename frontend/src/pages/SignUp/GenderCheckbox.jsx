import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <span className="label-text mr-3">Gender</span>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input type="radio" name="gender" value="male" className="radio radio-xs radio-primary"
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="gender" value="female" className="radio radio-xs radio-primary"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
    </label>
  )
}

export default GenderCheckbox