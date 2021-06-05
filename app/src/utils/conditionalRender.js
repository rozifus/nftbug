import { useRef, useEffect } from "react";

export default (condition, elementGen) => condition ? elementGen() : null 
