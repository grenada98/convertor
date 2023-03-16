import React, { useState, useEffect } from 'react';
import Select from 'react-select';


export const InputType = (props) => {
  const [options, setOptions] = useState([]);
  useEffect(()=>{
    if(props.rates){
      const keysData = Object.keys(props.rates);
      const selectData = keysData.map(item=>{
        return {value: item, label: item}
      })
      setOptions([...selectData])
    }
  }, [props.rates])
    useEffect(()=>{
      props.finishValue(props.valueInput)
    }, [props.currency])

    function onChange(e){ 
      props.finishValue(e)
      props.setValueInput(e);
    }

    function onChangeSelect(e){
      props.setCurrency(e.value)
    }

    return(
        <div className='convertor__type'>
            <input className={props.activeInput? 'convertor__input active':'convertor__input'} 
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