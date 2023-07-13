import React from 'react'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { deleteContact } from '../contacts'

export async function action({ params }: ActionFunctionArgs) {
  await deleteContact(params.id)
  return redirect('/')
}
