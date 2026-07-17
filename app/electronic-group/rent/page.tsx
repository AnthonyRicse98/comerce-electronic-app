import React from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';
import FeatureTimeline from '@/components/Timeline';

export default async function Rent() {
    const { information, rent } = await ElectronicRepository.getGroupElectronic();
  
  return (
    <>
      <FeatureTimeline information={information} data={rent}/>
      <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
    </>
  );
}
