<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/createServerRpc-B7vsMDas.mjs
import { T as TSS_SERVER_FUNCTION } from "./server-BWmwJzJ_.mjs";
========
import { T as TSS_SERVER_FUNCTION } from "./server-BO7pyA8t.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/createServerRpc-C-96jpkR.mjs
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
export {
  createServerRpc as c
};
