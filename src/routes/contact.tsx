import { Form, Outlet, useFetcher } from 'react-router-dom'
import { useLoaderData } from '../utils'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import { getContact, updateContact } from '../contacts'

export async function loader({ params }: LoaderFunctionArgs) {
  const contact: Contact = await getContact(params.id)

  throw new Error('balh')

  return {
    contact,
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log('pppp')
  try {
    let fav = (await request.formData()).get('favorite') as string

    return await updateContact(params.id, {
      favorite: fav === 'true',
    })
  } catch (error) {
    throw new Response(null, { status: 500 })
  }
}

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>()

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edith</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

function Favorite({ contact }: { contact: Contact }) {
  const fetcher = useFetcher()
  // yes, this is a `let` for later
  let favorite = contact.favorite

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
