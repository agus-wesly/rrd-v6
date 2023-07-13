import React from 'react'

import {
  Form,
  type ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  redirect,
  useNavigate,
} from 'react-router-dom'
import { getContact, updateContact } from '../contacts'

export async function action({ params, request }: ActionFunctionArgs) {
  const oldContact = (await getContact(params.id)) as Contact

  const formData = await request.formData()
  const newData = {
    ...oldContact,
    first: (formData.get('first') as string) || oldContact.first,
    last: (formData.get('last') as string) || oldContact.last,
    twitter: (formData.get('twitter') as string) || oldContact.twitter,
    avatar: (formData.get('avatar') as string) || oldContact.avatar,
  } satisfies Contact

  await updateContact(oldContact.id, newData)

  return redirect(`/contacts/${params.id}`)
}

export async function loader({ params }: LoaderFunctionArgs) {
  const contact = await getContact(params.id)

  return { contact }
}

export default function Edit() {
  const { contact } = useLoaderData() as { contact: Contact }
  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  )
}
