const LastUpdate = ({ lastUpdate }) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return (
    <p className='last-update'>
      Last update: {lastUpdate.toLocaleTimeString('en-GB', options)}
    </p>
  );
};

export default LastUpdate;
