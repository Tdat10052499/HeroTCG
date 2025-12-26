module hero_tcg::hero_tcg {
    use std::string;

    public struct Hero has key, store {
        id: UID,
        name: string::String,
        level: u8, //Why U8? Because heroes start at level 1 and can go up to level 255
        image_url: string::String,
    }

    public fun create_hero(name: string::String, level: u8, image_url: string::String, ctx: &mut TxContext) {
        let hero = Hero {
            id: sui::object::new(ctx),
            name,
            level,
            image_url,
        };
        transfer::transfer(hero, sui::tx_context::sender(ctx));
    }

    public fun level_up(hero: &mut Hero) {
        hero.level = hero.level + 1;
    }

    public fun get_hero_info(hero: &Hero): (string::String, u8, string::String) {
        (
            hero.name,
            hero.level,
            hero.image_url,
        )
    }
}