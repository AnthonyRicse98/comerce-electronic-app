import React from 'react'

import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';

import Gallery from '@/components/Gallery/gallery'

export default async function ElectronicBoard() {
    const { electronicBoard } = await ElectronicRepository.getElectronicBoard();
  console.log(electronicBoard)
  return (
    <>
    <Gallery electronicBoard={electronicBoard} />
    <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
    </>
  )
}
