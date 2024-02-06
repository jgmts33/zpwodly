const UPSTREAM_CONTENT_HOSTNAME = 'tarantula-keyboard-lj2x.squarespace.com'

const UPSTREAM_API_ROOT_URLS = {
  core: 'https://k2vrbdtgf0.execute-api.us-east-2.amazonaws.com',
}

class RemoveElementHandler {
  async element(element: Element) {
    element.remove()
  }
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  console.log(`Received new request: ${url.toString()}`)
  let rewriter = null
  // Generic upstream path
  if (/^\/up\//.exec(url.pathname)) {
    url.hostname = UPSTREAM_API_ROOT_URLS['core']
    url.pathname = '/production' + url.pathname
  } else {
    url.hostname = UPSTREAM_CONTENT_HOSTNAME
    if (url.searchParams.get('embedded')) {
      rewriter = new HTMLRewriter()
        .on('header', new RemoveElementHandler())
        .on('footer', new RemoveElementHandler())
        .on('section.item-pagination', new RemoveElementHandler())
      if (/\/building-credit-tips-blog\//.exec(url.pathname)) {
        rewriter.on('div.blog-item-meta-wrapper', new RemoveElementHandler())
      }
    }
  }
  const response = await fetch(url.toString(), request)

  if (rewriter !== null) {
    return rewriter.transform(response)
  }

  return response
}
