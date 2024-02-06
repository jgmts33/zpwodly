import {
  UPWARDLI_RUNTIME_CONTEXT,
  UPWARDLI_API_HOST,
} from "@upwardli/shared/env";

import { CoreApi, Configuration } from "@upwardli/api";

export function getCoreAPIClient(): CoreApi {
  let config = new Configuration();
  // @ts-ignore: UPWARDLI_RUNTIME_CONTEXT is static in the container
  if (UPWARDLI_RUNTIME_CONTEXT === "web") {
    if (typeof window === "undefined") {
      // SSR - fetch is defined but not on window
      config = new Configuration({
        basePath: UPWARDLI_API_HOST,
        fetchApi: fetch,
      });
    } else {
      // Web
      config = new Configuration({
        basePath: "//" + window.location.host,
      });
    }
    // @ts-ignore: UPWARDLI_RUNTIME_CONTEXT is static in the container
  } else if (UPWARDLI_RUNTIME_CONTEXT === "native") {
    config = new Configuration({
      basePath: UPWARDLI_API_HOST,
    });
  } else {
    throw new Error("Unrecognized UPWARDLI_RUNTIME_CONTEXT");
  }
  return new CoreApi(config);
}
