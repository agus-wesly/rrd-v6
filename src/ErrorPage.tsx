import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  let content = null

  if (isRouteErrorResponse(error)) {
    content = (
      <>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
      </>
    )
  } else {
    content = <p>Something went wrong :(</p>
  }

  return <div id="error-page">{content}</div>
}
