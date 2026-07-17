import React from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';
import FeatureTimeline from '@/components/Timeline';

export default async function Replacement() {
  const { information, replacement } = await ElectronicRepository.getGroupElectronic();

  return (
    <>
      <FeatureTimeline information={information} data={replacement} />
      <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
    </>
  );
}
