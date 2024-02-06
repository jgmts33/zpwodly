#!/bin/bash

rm shared/env.ts
touch shared/env.ts
echo \
    "export const UPWARDLI_API_HOST = \"${UPWARDLI_API_HOST}\";" \
    >> shared/env.ts
echo \
    "export const UPWARDLI_RUNTIME_CONTEXT = \"${UPWARDLI_RUNTIME_CONTEXT}\";" \
    >> shared/env.ts

# Required if UPWARDLI_RUNTIME_CONTEXT = web
echo \
    "export const UPWARDLI_WEB_CONTEXT = \"${UPWARDLI_WEB_CONTEXT}\";" \
    >> shared/env.ts

exec "$@"
