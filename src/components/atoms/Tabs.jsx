import React from 'react';

function Tabs(props) {

      return (
        <>
        <p className='hint mys'> Степень риска</p>
          <div className={'tabs flex flex-row rounded'}>
            <div className="tab flex rounded justify-center pys px"><p>Низкий</p></div>
            <div className="tab active rounded flex justify-center pys px"><p>Средний</p></div>
            <div className="tab flex rounded justify-center pys px"><p>Высокий</p></div>
          </div>
        </>
      )
}
export default Tabs