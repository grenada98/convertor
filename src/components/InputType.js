import React, { useEffect } from 'react';
import Select from 'react-select';

const options = [
    { value: 'UAH', label: 'Гривні' },
    { value: 'USD', label: 'Долари' },
    { value: 'EUR', label: 'Євро' },
  ];

export const InputType = (props) => {
    useEffect(()=>{
      props.finishValue(props.valueInput)
    },
    [props.currency])
    function onChange(e){ 
      props.finishValue(e)
      props.setValueInput(e);
    }
    function onChangeSelect(e){ //для установки валют
      props.setCurrency(e.value)
    }
    return(
        <div className='convertor__type'>
            <input ref={props.link} className={props.activeInput? 'convertor__input active':'convertor__input'} 
                placeholder='Сума' 
                value={props.valueInput} 
                onChange={e=>onChange(e.target.value)} 
                readOnly={!props.activeInput} 
                type="number"
            />
            <div className='convertor__select-wrapper'>
              <Select
                  defaultValue={null}
                  options={options}
                  onChange={(e)=>onChangeSelect(e)}
              />
            </div>
        </div>
    )
}