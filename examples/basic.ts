import { debounce } from "../dist/index.js";
const log = debounce((value: string) => console.log(value), 100);
log("first");
log("last");
log.flush();
