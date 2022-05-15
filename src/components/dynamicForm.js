import React, { useRef, useState, useEffect } from 'react';
import { TextBox } from './textBox';
import { DropdownSelect } from './select';
import { fetchData, postData } from '../helper/utils';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const DynamicForm = (props) => {
  const [fields, setFields] = useState(props.data);
  const [finalData, setFinalData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const finalResponse = useRef();

  useEffect(() => {
    Promise.resolve(fetchData()).then((data) => {
      setIsLoading(false);
      props.fetchData(data);
      setFields(data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsActive(false);
    Promise.resolve(postData(fields)).then((response) => {
      setFinalData(JSON.stringify(response));
      setIsLoading(false);
      setIsActive(true);
      finalResponse.current && finalResponse.current.focus();
    });
  };

  const handleChange = (index, e) => {
    fields[index].value = e.target.value;
    setFields([...fields]);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        {fields &&
          fields.map((field, index) => {
            switch (field.type) {
              case 'select':
                return (
                  <DropdownSelect
                    fieldName={field.fieldName}
                    values={field.options}
                    type={field.type}
                    index={index}
                    key={index}
                    handleChange={handleChange}
                    isActive={isActive}
                  />
                );
              default:
                return (
                  <TextBox
                    fieldName={field.fieldName}
                    formType={field.type}
                    value={field.value}
                    index={index}
                    key={index}
                    handleChange={handleChange}
                    isActive={isActive}
                  />
                );
            }
          })}
        {!isLoading ? (
          <div className="submit" onClick={onSubmit}>
            <Button variant="contained">Submit</Button>
          </div>
        ) : (
          <Loader />
        )}
      </form>
      {!isLoading && finalData.length > 0 ? (
        <div className="response-container" tabIndex="0" ref={finalResponse}>
          <h2>Response</h2>
          <div className="response">{finalData}</div>
        </div>
      ) : null}
    </>
  );
};

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', 'justify-content': 'center' }}>
      <CircularProgress />
    </Box>
  );
};
