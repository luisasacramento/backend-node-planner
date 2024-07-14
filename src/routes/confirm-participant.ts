import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mail'
import { prisma } from '../lib/prisma'


export async function confirmParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    'participants/:participantId/confirm',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const {  participantId } = request.params

      const participant = await prisma.participant.findUnique({
        where:{
            id: participantId,
        }
      })

      if(!participant){
        throw new Error ('Participant Not Found.')
      }

      if(participant.is_confirmed){
        return reply.redirect(`http://localhost:3000/trips/${participant.tripId}`)
      }

      await prisma.participant.update({
        where:{id: participantId},
        data: {is_confirmed: true}
      })


      return reply.redirect(`http://localhost:3000/trips/${participant.tripId}`)
    },
  )
}