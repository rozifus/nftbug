
import React, { useContext, useEffect, useState } from 'react';


export const explodeContext = (useFunction, ...params) => ({children}) => {
    const ctx = useFunction(...params)
    return {children(ctx)}
}
