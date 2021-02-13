import { Box, Container, Image } from '@chakra-ui/react';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import BANNERS from '../../constants/banners';
import CHANCES from '../../constants/chances';
import HEXCODES, { GetElementColor } from '../../constants/hexcodes';
import PATHS from '../../constants/paths';
import { useWishState } from '../../state-management/store';
import BannerDetailHeader from '../../components/banner-detail/banner-detail-header';
import './banner-detail.css';
import ItemsToWishForSection from '../../components/items-to-wish-for-section/items-to-wish-for-section';
import Information from '../../components/information/information';

// TODO: Refactor this later, font weight = 500 for all sections, increase font-size
const BannerDetail = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner);
    const bannerTitle = `"${currentBanner?.title}"`;
    const eventFiveStarCharacter = currentBanner?.eventFiveStar;

    const toThreePrecision = (num: number) => num.toFixed(3);

    const CharacterText = ({character}: any) => <span style={{color: GetElementColor(character.elementType || '') }}>"{character.title}" {character.name} ({character.elementType})</span>;
    const ImportantText = ({children}: any) => <span style={{color: `${HEXCODES.IMPORTANT}`}}>{children}</span>;
    const MasterlessStardustText = () => <span style={{color: `${HEXCODES.STARGLITTER_TEXT}`}}>Masterless Starglitter</span>;
    const PurpleText = ({children}: any) => <span style={{color: `${HEXCODES.PURPLE}`}}>{children}</span>

    const FourStarText = () => (
        // Creates: "Title" CharacterName (Type), "Title" CharacterName (Type), and "Title" CharacterName (Type) 
        <>
            {currentBanner?.eventFourStars?.map((c, index) => {
                const textColor = GetElementColor(c.elementType);
                const andText = index + 1 >= (currentBanner?.eventFourStars?.length || 999 )? ' and ' : '';

                return (
                    <span key={`${c.name + index}`}>
                        {andText} <span style={{color: textColor}}>"{c.title}" {c.name} ({c.elementType}){andText ? ' ' : ','}</span>
                    </span>
                )
            })}
        </>
    )

    const DuplicateCharactersSection = () => (
        <section>
            <h2>〓Duplicate Characters〓</h2>
            <p>
                On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): 
                The 2nd – 7th time you obtain the character, it will be converted into <PurpleText>that character's Stella Fortuna</PurpleText> ×1 
                and <MasterlessStardustText/> ×10; from the 8th time onwards it will be converted into <MasterlessStardustText/> ×25.
            </p>
            <p>
                On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): 
                The 2nd – 7th time you obtain the character, it will be converted into <PurpleText>that character's Stella Fortuna</PurpleText> ×1 
                and <MasterlessStardustText/> ×2; from the 8th time onwards it will be converted into <MasterlessStardustText/> ×5.
            </p>
            <aside style={{marginTop: '30px'}}>
                ※ This is a character event wish. The wish guarantee count is accumulated within character event wishes only and is independent of the 
                guarantee counts of other types of wishes.
            </aside>
        </section>
    )

    const IncreasedDropRateSection = () => (
        <section>
            <h1 style={{color: '#575757'}}>Increased Drop Rates!</h1>
            <BannerDetailHeader backgroundColor={HEXCODES.FIVE_STAR_CHANCE_BANNER} stars={5}>
                Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)
            </BannerDetailHeader>
            <Image src={`${PATHS.CHARACTER_THUMBNAIL_WITH_BACKGROUND}/${eventFiveStarCharacter?.name.toLowerCase()}.png`} alt={`${eventFiveStarCharacter?.name.toLowerCase()}`}/>
            <BannerDetailHeader backgroundColor={HEXCODES.FOUR_STAR_CHANCE_BANNER} stars={4}>
                Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)
            </BannerDetailHeader>
            {
                (currentBanner?.eventFourStars || []).map(c => 
                    <Image 
                        style={{display: 'inline', margin: '0 30px 30px 0'}} 
                        key={`detail-img-${c.name}`} 
                        src={`${PATHS.CHARACTER_THUMBNAIL_WITH_BACKGROUND}/${c.name.toLowerCase()}.png`} alt={`${c.name.toLowerCase()}`}/>
                )
            }
        </section>
    )

    const RulesSection = () => (
        <section>
            <h2>〓Rules〓</h2>
            <p>5-Star Items</p>
            <p>
                For Event Wish {bannerTitle}: Base probability of winning 5-star character = <ImportantText>{toThreePrecision(CHANCES.FIVE_STAR * 200)}%</ImportantText>;
                consolidated probability (incl. guarantee) = <ImportantText>1.600%</ImportantText>; 
                gauranteed to win 5-star character at least once per <ImportantText>90</ImportantText> attempts.
            </p>
            <p>
                The first time you win a 5-star item in this event wish, there is a <ImportantText>50.000%</ImportantText> chance it will be the promotional 
                character <CharacterText character={eventFiveStarCharacter}/>.
            </p>
            <p>4-Star Items</p>
            <p>
                For Event Wish {bannerTitle}: Base probability of winning 4-star item = <ImportantText>{toThreePrecision(CHANCES.FOUR_STAR * 200)}%</ImportantText>; 
                base probability of winning 4-star character = <ImportantText>{toThreePrecision(CHANCES.FOUR_STAR * 100)}%</ImportantText>, 
                and base probability of winning 4-star weapon = <ImportantText>{toThreePrecision(CHANCES.FOUR_STAR * 100)}%</ImportantText>; consolidated probability 
                (incl. guarantee) of winning 4-star item = <ImportantText>13.000%</ImportantText>; gauranteed to win 4-star or above item at least 
                once per <ImportantText>10</ImportantText>; probability of winning 4-star item through the guarantee = <ImportantText>99.400%</ImportantText>, and 
                probability of winning 5-star item through the guarantee = <ImportantText>{toThreePrecision(CHANCES.FIVE_STAR * 200)}%</ImportantText>.
            </p>
            <p>
                The first time you win a 4-star item in this event wish, there is a <ImportantText>{CHANCES.FOUR_STAR_EVENT_CHARACTER}</ImportantText> chance it will 
                be one of the featured characters <FourStarText/>. If the first 4-star item you win in this event wish is not one of the featured characters, 
                then the next 4-star item you win is <ImportantText>guaranteed</ImportantText> to be a featured character.
            </p>
            <aside style={{marginTop: '30px'}}>
                4-star weapons won in this wish come with <MasterlessStardustText/> ×2; 3-star weapons won in this wish come with <PurpleText>Masterless Stardust</PurpleText> ×15.
            </aside>
        </section>
    )

    const WishDetailSection = () => (
        <section>
            <h1 style={{color: '#575757'}}>Wish Details</h1>
            <BannerDetailHeader backgroundColor={HEXCODES.LIMITED_TIME_BANNER} title='Limited-Time Event' color='#FFFFFF'/>
            <p>
                Event Wish {bannerTitle} is now available. During this event wish, the <ImportantText> event-exclusive </ImportantText>
                5-star character <CharacterText character={eventFiveStarCharacter}/> as well as 4-star characters 
                <FourStarText/> will get a <ImportantText> huge drop-rate boost</ImportantText>!
            </p>
            <aside>
                <ImportantText>※ Of the above characters, the event-exclusive character will not be available in the standard wish "Wanderlust Invocation".</ImportantText>
            </aside>
        </section>
    );

    return (
        <Information>
            <header style={{paddingBottom: '10px'}}> 
                <svg width="11" height="55" style={{display: 'inline'}}>
                    <rect width='11' height='45' style={{fill: '#4D4D4D'}}/>
                </svg>
                <span style={{marginLeft: '50px', fontSize: '46px'}}>
                    Event Wish {bannerTitle}
                </span>
            </header>
            <article>
                <IncreasedDropRateSection/>
                <WishDetailSection/>
                <RulesSection/>
                <DuplicateCharactersSection/>
                <ItemsToWishForSection/>
            </article>
        </Information>
    )
}

export default BannerDetail;
