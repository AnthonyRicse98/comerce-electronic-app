import React from 'react'

import TimelineBlock from '@/components/TimelineTransition'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';

export default async function FotovoltaicSystem() {
    const { information, post } = await ElectronicRepository.getFotovoltaicSystem();

    return (
        <>
            <TimelineBlock information={information} data={post}/>
            <WhatsAppButton phoneNumber="51940058361" className="bottom-6 right-6 md:bottom-10 md:right-10" />
        </>
    )
}
