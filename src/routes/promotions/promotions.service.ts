import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class PromotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPromotionDto: CreatePromotionDto, userId: string) {
    const promoAlreadyExists = await this.prisma.promotions.findFirst({
        where: {
            promo_url: createPromotionDto.promo_url 
        }
    })

    if(promoAlreadyExists) {
        throw new ConflictException('Promotion already register')
    }
    
    const createdPromotion = await this.prisma.promotions.create({
        data: {
            ...createPromotionDto,
            userId
        }
     })
    
    return createdPromotion;
  }

  async findAll() {
    return await this.prisma.promotions.findMany({
        include: {
            rate_log: true
        }
    });
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const updatedPromotion = await this.prisma.promotions.update({
        where: {
            id
        },
        data: updatePromotionDto
    })

    return updatedPromotion;
  }

  async remove(id: string) {
    await this.prisma.promotions.delete({
        where: {
            id
        }
    })
  }

  async rate(id: string, rate: string, userId: string) {
    const promotion = await this.prisma.promotions.findFirst({
        where: {
            id
        },
        include: {
            rate_log: true
        }
    })

    const alreadyRate = promotion.rate_log.find(rate => rate.user_id === userId)

    if((alreadyRate?.like && rate === 'like') || (alreadyRate?.like === false && rate === 'dislike')) {
        throw new ConflictException('Its only allowed one vote per account, you can only change the vote')
    }

    if(alreadyRate) {
        await this.prisma.rate_log.update({
            where: {
                id: alreadyRate.id
            },
            data: {
                like: !alreadyRate.like
            }
        })
    } else {
        await this.prisma.rate_log.create({
            data: {
                user_id: userId,
                Promotion: {
                    connect: {
                        id: promotion.id
                    }
                },
                like: rate === 'like' ? true : false
            }
        })
    }

    const promotionRateLog = await this.prisma.rate_log.findMany({
        where: {
            promotionId: id
        }
    })

    let likeCount = 0
    let dislikeCount = 0

    promotionRateLog.forEach(({ like }) => {
        if(like) {
            likeCount++
        } else {
            dislikeCount++
        }
    })

    const shiny_meter = likeCount - dislikeCount

    await this.prisma.promotions.update({
        where: {
            id
        },
        data: {
            shiny_meter
        }
    })

    return {
        message: `Promotion ${promotion.name} rated successfully`
    };
  }
}
