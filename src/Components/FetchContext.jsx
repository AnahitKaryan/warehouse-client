import  React  from 'react';

const FetchContext =  React.createContext();
const FetchProvider = FetchContext.Provider;

export { FetchContext, FetchProvider }