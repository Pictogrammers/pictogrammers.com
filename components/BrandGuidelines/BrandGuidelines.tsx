import { FunctionComponent } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import cx from 'clsx';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiArrowDown } from '@mdi/js';

import Head from '../Head/Head';
import Layout from '../Docs/Layout/Layout';
import Heading from '../Docs/Heading';
import Link from '../Link/Link';

import PictogrammersLogoSvg from '../../public/images/brand/logos/pictogrammers-full.svg';
import MDILogoSvg from '../../public/images/libraries/mdi.svg';
import MDILLogoSvg from '../../public/images/libraries/mdil.svg';
import PictogrammersMonogram from '../../public/images/brand/logos/pictogrammers-monogram.png';
import PictogrammersLogo from '../../public/images/brand/logos/pictogrammers-full.png';
import PictogrammersLogoBlack from '../../public/images/brand/logos/pictogrammers-full-black.png';
import PictogrammersLogoWhite from '../../public/images/brand/logos/pictogrammers-full-white.png';
import ClearingSpace from '../../public/images/brand/clearing-space.png';
import ClearingSpaceGuide from '../../public/images/brand/clearing-space-guide.png';
import ClearingSpaceMonogram from '../../public/images/brand/clearing-space-monogram.png';
import ClearingSpaceMonogramGuide from '../../public/images/brand/clearing-space-monogram-guide.png';
import Wordmark from '../../public/images/brand/wordmark.png';
import GuidanceBusyBack from '../../public/images/brand/busy-back.png';
import GuidanceAlterColor from '../../public/images/brand/alter-color.png';
import GuidanceWordmarkRecreate from '../../public/images/brand/wordmark-recreate.png';
import GuidanceWordmarkReplace from '../../public/images/brand/wordmark-replace.png';
import GuidanceAdjustedSize from '../../public/images/brand/adjusted-size.png';
import GuidanceDistorted from '../../public/images/brand/distorted.png';
import GuidanceShadowed from '../../public/images/brand/shadowed.png';
import GuidanceCropped from '../../public/images/brand/cropped.png';

import classes from './BrandGuidelines.module.scss';

const Heading2 = Heading(2);

interface BrandGuidelinesProps {
  description: string;
  title: string;
}

const BrandGuidelines: FunctionComponent<BrandGuidelinesProps> = ({ description, title }) => {
  const toc = [
    { content: 'Logo', lvl: 2, slug: 'logo' },
    { content: 'Color', lvl: 2, slug: 'color' },
    { content: 'Clearing Space', lvl: 2, slug: 'clearing-space' },
    { content: 'Logo on Color', lvl: 2, slug: 'logo-on-color' },
    { content: 'Wordmark', lvl: 2, slug: 'wordmark' },
    { content: 'Monogram', lvl: 2, slug: 'monogram' },
    { content: 'Icon Library Logos', lvl: 2, slug: 'icon-library-logos' },
    { content: 'Guidance', lvl: 2, slug: 'guidance' }
  ];

  return (
    <div className={classes.root}>
      <Head
        description={description}
        title={`${title} - Docs`}
        type='article'
      />
      <Layout
        title='Brand Guidelines'
        toc={toc}
      >
        <section className={classes.logo}>
          <Heading2>Logo</Heading2>
          <PictogrammersLogoSvg className={classes.pictogrammers} />
          <p>The Pictogrammers logo is the central visual identity for the Pictogrammers group. The monogram was created by <Link href='/contributor/Templarian'>Austin Andrews</Link> in 2020. The following year, the wordmark was added by <Link href='/contributor/mririgoyen'>Michael Irigoyen</Link>, completing the logo.</p>
          <Button
            className={classes.button}
            component={Link}
            endIcon={<Icon path={mdiArrowDown} size={1} />}
            href='/brand/pictogrammers-brand-assets.zip'
            variant='contained'
          >
            Download Logo Assets
          </Button>
        </section>

        <section>
          <Heading2>Color</Heading2>
          <p>Our primary color palette is Pictogrammers Purple on a white background.</p>
          <div className={classes.swatches}>
            <div className={cx(classes.swatch, classes.purple)}>
              <h3>Pictogrammers Purple</h3>
              <div className={classes.values}>
                <p>HEX<br />#520065</p>
                <p>RGB<br />82 0 101</p>
                <p>CMYK<br />78 100 24 22</p>
              </div>
            </div>
            <div className={cx(classes.swatch, classes.white)}>
              <h3>White</h3>
              <div className={classes.values}>
                <p>HEX<br />#FFF</p>
                <p>RGB<br />255 255 255</p>
                <p>CMYK<br />0 0 0 0</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Clearing Space</Heading2>
          <p>The minimum clearing space of the logo is the width of the P in Pictorgrammers.</p>
          <div className={classes.space}>
            <div className={classes.spaceLogos}>
              <ExportedImage
                alt='Pictogrammers logo with clearing space guides'
                height={220}
                placeholder='empty'
                src={ClearingSpaceGuide}
                width={592}
              />
              <ExportedImage
                alt='Pictogrammers logo with clearing space example'
                height={220}
                placeholder='empty'
                src={ClearingSpace}
                width={592}
              />
            </div>
            <div className={classes.spaceMonos}>
              <ExportedImage
                alt='Pictogrammers monogram with clearing space guides'
                height={220}
                placeholder='empty'
                src={ClearingSpaceMonogramGuide}
                width={205}
              />
              <ExportedImage
                alt='Pictogrammers monogram with clearing space example'
                height={220}
                placeholder='empty'
                src={ClearingSpaceMonogram}
                width={205}
              />
            </div>
          </div>
        </section>

        <section>
          <Heading2>Logo on Color</Heading2>
          <p>In some situations, the logo can be used on a colored background as long as there is a 5:1 contrast ratio. Anything less is not recommended. <Link href='https://webaim.org/resources/contrastchecker/' target='_blank'>Check color contrasts here.</Link></p>
          <div className={classes.logoOnColor}>
            <ExportedImage
              alt='Pictogrammers Logo on White Background'
              className={classes.backWhite}
              height={126}
              placeholder='empty'
              src={PictogrammersLogo}
              width={402}
            />
            <ExportedImage
              alt='Pictogrammers Logo on Yellow Background'
              className={classes.backYellow}
              height={126}
              placeholder='empty'
              src={PictogrammersLogo}
              width={402}
            />
            <ExportedImage
              alt='Pictogrammers Logo on Purple Background'
              className={classes.backPurple}
              height={126}
              placeholder='empty'
              src={PictogrammersLogo}
              width={402}
            />
            <ExportedImage
              alt='Pictogrammers Logo on Green Background'
              className={classes.backGreen}
              height={126}
              placeholder='empty'
              src={PictogrammersLogo}
              width={402}
            />
          </div>
          <p>In cases where the logo must display or print in a single color, there is an entirely white or black logo.</p>
          <div className={classes.logoOnColor}>
            <ExportedImage
              alt='Pictogrammers Logo in Black on White Background'
              className={classes.backWhite}
              height={126}
              placeholder='empty'
              src={PictogrammersLogoBlack}
              width={402}
            />
            <ExportedImage
              alt='Pictogrammers Logo in White on Black Background'
              className={classes.backBlack}
              height={126}
              placeholder='empty'
              src={PictogrammersLogoWhite}
              width={402}
            />
          </div>
        </section>

        <section>
          <Heading2>Wordmark</Heading2>
          <p>The Pictogrammers wordmark may exist without the monogram. The typeface used to set the logo wordmark is <Link href='https://manropefont.com/' target='_blank'>Manrope</Link>. The wordmark is optically kerned and its uppercase &quot;P&quot; is customized to mirror the monogram.</p>
          <figure className={classes.wordmark}>
            <ExportedImage
              alt='Manual kerning and custom P vs. Manrope'
              height={200}
              placeholder='empty'
              src={Wordmark}
              width={580}
            />
            <figcaption>
              <span>Manual kerning and custom &quot;P&quot;</span> vs. Manrope
            </figcaption>
          </figure>
        </section>

        <section>
          <Heading2>Monogram</Heading2>
          <p>We use the monogram for our GitHub account, social media profile images, and as our &quot;favicon&quot; on our official site. The monogram may be used in cases where the association with Pictogrammers is clearly evident.</p>
          <div className={classes.monogramSizes}>
            <figure className={classes.size128}>
              <ExportedImage
                alt='Pictogrammers monogram at 128px'
                height={377}
                placeholder='empty'
                src={PictogrammersMonogram}
                width={346}
              />
              <figcaption>128px</figcaption>
            </figure>
            <figure className={classes.size64}>
              <ExportedImage
                alt='Pictogrammers monogram at 64px'
                height={377}
                placeholder='empty'
                src={PictogrammersMonogram}
                width={346}
              />
              <figcaption>64px</figcaption>
            </figure>
            <figure className={classes.size32}>
              <ExportedImage
                alt='Pictogrammers monogram at 32px'
                height={377}
                placeholder='empty'
                src={PictogrammersMonogram}
                width={346}
              />
              <figcaption>32px</figcaption>
            </figure>
            <figure className={classes.size16}>
              <ExportedImage
                alt='Pictogrammers monogram at 16px'
                height={377}
                placeholder='empty'
                src={PictogrammersMonogram}
                width={346}
              />
              <figcaption>16px</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <Heading2>Icon Library Logos</Heading2>
          <p>Each of our icon libraries maintain their own visual identity in terms of logo and color. Please show them the same care and respect as the Pictogrammers monogram.</p>
          <div className={cx(classes.library, classes.mdi)}>
            <MDILogoSvg title='Material Design Icons logo' />
            <div className={classes.swatch}>
              <h3>Material Design Icons</h3>
              <div className={classes.values}>
                <p>HEX<br />#2196F3</p>
                <p>RGB<br />33 150 243</p>
                <p>CMYK<br />82 36 0 5</p>
              </div>
            </div>
          </div>
          <div className={cx(classes.library, classes.mdl)}>
            <MDILLogoSvg title='Material Design Icons Light logo' />
            <div className={classes.swatch}>
              <h3>Material Design Light</h3>
              <div className={classes.values}>
                <p>HEX<br />#5A88AD</p>
                <p>RGB<br />90 136 173</p>
                <p>CMYK<br />33 15 0 32</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading2>Guidance</Heading2>
          <p>Please maintain consistency of our brand by not misusing the Pictogrammers logo, monogram, wordmark, or any of our various icon library logos. If you have a question about whether your use of our logo is accepted, please <Link href='https://fosstodon.org/@pictogrammers' rel='me' target='_blank'>get in touch</Link>.
          </p>
          <div className={classes.rules}>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo on a busy background'
                height={120}
                placeholder='empty'
                src={GuidanceBusyBack}
                width={400}
              />
              <figcaption>Do not place the logo on busy backgrounds.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with altered colors'
                height={120}
                placeholder='empty'
                src={GuidanceAlterColor}
                width={400}
              />
              <figcaption>Do not alter the logo colors.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with recreated wordmark'
                height={120}
                placeholder='empty'
                src={GuidanceWordmarkRecreate}
                width={400}
              />
              <figcaption>Do not recreate the wordmark in Manrope.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with manipulated wordmark'
                height={120}
                placeholder='empty'
                src={GuidanceWordmarkReplace}
                width={400}
              />
              <figcaption>Do not change the typeface or manipulate the wordmark.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with adjusted sizes'
                height={120}
                placeholder='empty'
                src={GuidanceAdjustedSize}
                width={400}
              />
              <figcaption>Do not adjust or reconfigure the size or placement of any logo elements.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with distortions'
                height={120}
                placeholder='empty'
                src={GuidanceDistorted}
                width={400}
              />
              <figcaption>Do not rotate, skew, stretch, or distort the logo.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with a shadow'
                height={120}
                placeholder='empty'
                src={GuidanceShadowed}
                width={400}
              />
              <figcaption>Do not apply bevel, shadow, or other effects to the logo.</figcaption>
            </figure>
            <figure>
              <ExportedImage
                alt='Pictogrammers logo with a section cropped'
                height={120}
                placeholder='empty'
                src={GuidanceCropped}
                width={400}
              />
              <figcaption>Do not cut the logo.</figcaption>
            </figure>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default BrandGuidelines;