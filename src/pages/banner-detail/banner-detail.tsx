import React from 'react';
import BANNERS, { BANNER_CODE } from '../../constants/banners';
import CHANCES from '../../constants/chances';
import COLORS, { GetElementColor } from '../../constants/colors';
import PATHS from '../../constants/paths';
import { useWishState } from '../../state-management/store';
import BannerDetailSubHeader from '../../components/banner-detail-sub-header/banner-detail-sub-header';
import ItemsToWishForSection from '../../components/items-to-wish-for-section/items-to-wish-for-section';
import InformationContainer from '../../components/information-container/information-container';
import '../../styles/banner-detail.css';

const BannerDetail = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner);
    const isWanderlust = currentBanner?.code === BANNER_CODE.WANDERLUST;
    const bannerTitle = `"${currentBanner?.title}"`;
    const eventFiveStarCharacter = currentBanner?.eventFiveStar;

    const toThreePrecision = (num: number) => num.toFixed(3);

    const CharacterText = ({character}: any) => <span style={{color: GetElementColor(character.elementType || '') }}>"{character.title}" {character.name} ({character.elementType})</span>;
    const ImportantText = ({children}: any) => <span style={{color: '#CD5239'}}>{children}</span>;
    const MasterlessStarglitterText = () => <span style={{color: '#C27746'}}>Masterless Starglitter</span>;
    const PurpleText = ({children}: any) => <span style={{color: '#A257E1'}}>{children}</span>

    const FourStarText = () => (
        // Creates: "Title" CharacterName (Type), "Title" CharacterName (Type), and "Title" CharacterName (Type) 
        <>
            {currentBanner?.eventFourStars.map((c, index) => {
                const textColor = GetElementColor(c.elementType);
                const andText = index + 1 >= (currentBanner?.eventFourStars.length || 999 )? ' and ' : '';

                return (
                    <span key={`${c.name + index}`}>
                        {andText} <span style={{color: textColor}}>"{c.title}" {c.name} ({c.elementType}){andText ? ' ' : ','}</span>
                    </span>
                )
            })}
        </>
    )

    const DuplicateCharactersSection = () => {
        return (
            <section className='detail-section'>
                <h2>〓Duplicate Characters〓</h2>
                <p>
                    On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): 
                    The 2nd – 7th time you obtain the character, it will be converted into <PurpleText>that character's Stella Fortuna</PurpleText> ×1 
                    and <MasterlessStarglitterText/> ×10; from the 8th time onwards it will be converted into <MasterlessStarglitterText/> ×25.
                </p>
                <p>
                    On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): 
                    The 2nd – 7th time you obtain the character, it will be converted into <PurpleText>that character's Stella Fortuna</PurpleText> ×1 
                    and <MasterlessStarglitterText/> ×2; from the 8th time onwards it will be converted into <MasterlessStarglitterText/> ×5.
                </p>
                { 
                    !isWanderlust && (
                        <aside style={{marginTop: '30px'}}>
                            ※ This is a character event wish. The wish guarantee count is accumulated within character event wishes only and is independent of the 
                            guarantee counts of other types of wishes.
                        </aside>
                    )
                }
            </section>
        )
    }

    const IncreasedDropRateSection = () => (
        <section className='detail-section'>
            <h1 style={{color: '#575757'}}>Increased Drop Rates!</h1>
            <BannerDetailSubHeader backgroundColor={COLORS.FIVE_STAR_CHANCE_BANNER} stars={5}>
                Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)
            </BannerDetailSubHeader>
            <img src={`${PATHS.CHARACTER_THUMBNAIL_WITH_BACKGROUND}/${eventFiveStarCharacter?.name.replaceAll(' ', '_').toLowerCase()}.webp`} alt={`${eventFiveStarCharacter?.name.toLowerCase()}`}/>
            <BannerDetailSubHeader backgroundColor={COLORS.FOUR_STAR_CHANCE_BANNER} stars={4}>
                Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)
            </BannerDetailSubHeader>
            {
                (
                    currentBanner?.eventFourStars || []).map(c =>
                        <img 
                            style={{display: 'inline', margin: '0 30px 30px 0'}} 
                            key={`detail-img-${c.name}`}
                            src={`${PATHS.CHARACTER_THUMBNAIL_WITH_BACKGROUND}/${c.name.replaceAll(' ', '_').toLowerCase()}.webp`} alt={`${c.name.toLowerCase()}`}/>
                )
            }
        </section>
    )

    const RulesSection = () => {
        return (
            <section className='detail-section'>
            <h2>〓Rules〓</h2>
            {
                isWanderlust ? (
                    <>
                        <p>
                            Base probability of winning 5-star item = <ImportantText>0.600%</ImportantText>; base probability of winning 5-star character = 
                            <ImportantText>0.300%</ImportantText>, and base probability of winning 5-star weapon = <ImportantText>0.300%</ImportantText>; 
                            consolidated probability (incl. guarantee) of winning 5-star item = <ImportantText>1.600%</ImportantText>; 
                            guaranteed to win 5-star item at least once per <ImportantText>90</ImportantText> attempts.
                        </p>
                        <p>
                            Base probability of winning 4-star item = <ImportantText>5.100%</ImportantText>; base probability of winning 4-star character = 
                            <ImportantText>2.550%</ImportantText>, and base probability of winning 4-star weapon = <ImportantText>2.550%</ImportantText>; 
                            consolidated probability (incl. guarantee) of winning 4-star item = <ImportantText>13.000%</ImportantText>; 
                            guaranteed to win 4-star or above item at least once per <ImportantText>10</ImportantText> attempts; 
                            probability of winning 4-star item through the guarantee = <ImportantText>99.400%</ImportantText>, 
                            and probability of winning 5-star item through the guarantee = <ImportantText>0.600%</ImportantText>.
                        </p>
                        <p>
                            5-star weapons won in this wish include <MasterlessStarglitterText/> ×10; 4-star weapons include <MasterlessStarglitterText/> ×2; 
                            3-star weapons include <PurpleText>Masterless Stardust</PurpleText> ×15.
                        </p>
                    </>
                ) : (
                    <>
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
                            4-star weapons won in this wish come with <MasterlessStarglitterText/> ×2; 3-star weapons won in this wish come with <PurpleText>Masterless Stardust</PurpleText> ×15.
                        </aside>
                    </>
                )
            }
            </section>
        )
    }

    const WishDetailSection = () => {
        const title = isWanderlust ? 'Permanent' : 'Limited-Time Event';
        return (
            <section className='detail-section'>
                <h1 style={{color: '#575757'}}>Wish Details</h1>
                <BannerDetailSubHeader backgroundColor='#A38052' title={title} color='#FFFFFF'/>
                {
                    isWanderlust ? (
                        <>
                            <p>
                                Standard Wish {bannerTitle} is a standard wish with no time limit. Non-promotional characters and weapons are available.
                            </p>
                            <p>
                                In this wish, <ImportantText>guaranteed</ImportantText> to win 4-star or above item at least once per 10 attempts.
                            </p>
                        </>
                    ) : (
                        <p>
                            Event Wish {bannerTitle} is now available. During this event wish, the <ImportantText> event-exclusive </ImportantText>
                            5-star character <CharacterText character={eventFiveStarCharacter}/> as well as 4-star characters 
                            <FourStarText/> will get a <ImportantText> huge drop-rate boost</ImportantText>!
                        </p>
                    )
                }
                <aside>
                    { 
                        !isWanderlust && 
                        <ImportantText>※ Of the above characters, the event-exclusive character will not be available in the standard wish "Wanderlust Invocation".</ImportantText>
                    }
                </aside>
            </section>
        );
    }

    return (
        <InformationContainer>
            <header className='banner-detail-header'> 
                <svg width="11" height="55" style={{display: 'inline'}}>
                    <rect width='11' height='45' style={{fill: '#4D4D4D'}}/>
                </svg>
                <span style={{marginLeft: '50px', fontSize: '46px'}}>
                    Event Wish {bannerTitle}
                </span>
            </header>
            <article>
                { !isWanderlust && <IncreasedDropRateSection/> }
                <WishDetailSection/>
                <RulesSection/>
                <DuplicateCharactersSection/>
                <ItemsToWishForSection/>
            </article>
        </InformationContainer>
    )
}

export default BannerDetail;
