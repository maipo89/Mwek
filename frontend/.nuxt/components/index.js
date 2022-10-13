export { default as BlockBuilder } from '../../components/BlockBuilder.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as SiteIntro } from '../../components/SiteIntro.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as BlogCard } from '../../components/UI/BlogCard.vue'
export { default as DropDown } from '../../components/UI/DropDown.vue'
export { default as Icon } from '../../components/UI/Icon.vue'
export { default as OnqorButton } from '../../components/UI/OnqorButton.vue'
export { default as OnqorCircleIcon } from '../../components/UI/OnqorCircleIcon.vue'
export { default as OnqorInput } from '../../components/UI/OnqorInput.vue'
export { default as TypeText } from '../../components/UI/TypeText.vue'
export { default as CardsWithFilter } from '../../components/archives/CardsWithFilter.vue'
export { default as ContactFooter } from '../../components/contact/ContactFooter.vue'
export { default as BlogPage } from '../../components/blog/BlogPage.vue'
export { default as SubscriptionSection } from '../../components/blog/SubscriptionSection.vue'
export { default as CityBuilding } from '../../components/citymap/CityBuilding.vue'
export { default as CityLights } from '../../components/citymap/CityLights.vue'
export { default as CityMapCards } from '../../components/citymap/CityMapCards.vue'
export { default as CityMapSVG } from '../../components/citymap/CityMapSVG.vue'
export { default as CityParks } from '../../components/citymap/CityParks.vue'
export { default as CitySculptur } from '../../components/citymap/CitySculptur.vue'
export { default as CityTurbines } from '../../components/citymap/CityTurbines.vue'
export { default as MeetTheTeam } from '../../components/explore/MeetTheTeam.vue'
export { default as OurApproach } from '../../components/explore/OurApproach.vue'
export { default as OurApproachSection } from '../../components/explore/OurApproachSection.vue'
export { default as TeamCube } from '../../components/explore/TeamCube.vue'
export { default as HeroSection } from '../../components/image/HeroSection.vue'
export { default as Footer } from '../../components/global/Footer.vue'
export { default as Header } from '../../components/global/Header.vue'
export { default as ContentColumns } from '../../components/text-content/ContentColumns.vue'
export { default as ContentWithImage } from '../../components/text-content/ContentWithImage.vue'
export { default as TextSection } from '../../components/text-content/TextSection.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
