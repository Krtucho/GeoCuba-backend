import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { CreateShopDto } from "./dto/create-shop.dto";
import { GetShopFilterDto } from "./dto/get-shops-filter.dto";
import { Shop } from "./shop.entity";

@CustomRepository(Shop)
export class ShopRepository extends Repository<Shop>{
    async getShops(filterDto: GetShopFilterDto): Promise<Shop[]>{
        const {search} = filterDto;
        const query = this.createQueryBuilder('shop');

        if (search){
            query.andWhere('shop.name LIKE :search', {search: `%${search}`});
        }

        const shops = await query.getMany();
        return shops;
    }
    
    async createShop(createShopDto: CreateShopDto):Promise<Shop>{
        const shop = new Shop();
        const {name} = createShopDto;
        console.log(name);
        shop.name = name;
        await shop.save();

        return shop;
    }
}