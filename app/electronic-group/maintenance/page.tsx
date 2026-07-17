import React from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton';
import FeatureTimeline from '@/components/Timeline';
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';

export default async function  Maintenance() {
  const { information, maintenance } = await ElectronicRepository.getGroupElectronic();
  console.log(maintenance)
  return (
    <>
      <FeatureTimeline information={information} data={maintenance}/>
      <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
    </>
  );
}
