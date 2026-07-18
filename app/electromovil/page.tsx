import React from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import TimelineBlock from '@/components/TimelineTransition'
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository'

export default async function ElectromovilCharge() {
  const { information: serviceInfo, post: serviceData } = await ElectronicRepository.getElectromovilCharge();

  const timelineInformation = {
    title: serviceInfo.title,
    post: serviceInfo.subtitle,
  };

  return (
    <>
      <TimelineBlock information={timelineInformation} data={serviceData} hasStats={true} />
      <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
    </>
  )
}