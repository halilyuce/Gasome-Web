<template>
  <div class="bg-white dark:bg-black col-span-12 h-screen overflow-auto">
    <div class="py-5 px-7">
      <h1>{{ $t('privacyP.title') }}</h1>
      <p>{{ $t('privacyP.relaseDate') }}</p>
      <p class="my-3">
        {{ $t('privacyP.firstPart') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.firstQuestion') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.firstExplanation') }}
      </p>
      <ul class="my-3">
        <li class="li1">{{ $t('privacyP.firstM') }}</li>
        <li class="li1">{{ $t('privacyP.secondM') }}</li>
        <li class="li1">{{ $t('privacyP.thirdM') }}</li>
        <li class="li1">{{ $t('privacyP.fourthM') }}</li>
        <li class="li1">{{ $t('privacyP.fifthM') }}</li>
        <li class="li1">{{ $t('privacyP.sixthM') }}</li>
        <li class="li1">{{ $t('privacyP.seventhM') }}</li>
        <li class="li1">{{ $t('privacyP.eightM') }}</li>
      </ul>
      <h3 class="my-3">{{ $t('privacyP.secondQuestion') }}</h3>
      <p><b></b>{{ $t('privacyP.secondExplanation') }}</p>
      <p class="my-3">
        {{ $t('privacyP.firstN') }}
      </p>
      <p class="my-3">
        <b>{{ $t('privacyP.secondN') }}</b>
      </p>
      <p class="my-3">
        {{ $t('privacyP.thirdN') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.fourthN') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.fifthN') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.sixthN') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.seventhN') }}
      </p>
      <ul class="my-3">
        <li class="li1">{{ $t('privacyP.nameThing') }}</li>
        <li class="li1">{{ $t('privacyP.mailThing') }}</li>
        <li class="li1">
          {{ $t('privacyP.socialThing') }}
        </li>
      </ul>
      <p class="my-3">
        {{ $t('privacyP.firstInfo') }}
      </p>
      <p class="my-3">{{ $t('privacyP.firstWhen') }}</p>
      <p class="my-3">
        {{ $t('privacyP.secondWhen') }}
      </p>
      <p class="my-3">{{ $t('privacyP.thirdWhen') }}</p>
      <p class="my-3">
        {{ $t('privacyP.firstInform') }}
      </p>
      <p class="my-3">
        <b>{{ $t('privacyP.firstInformationHeader') }} </b>
      </p>
      <p class="my-3">
        {{ $t('privacyP.secondPart') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.secondPartA') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.thirdInformationHeader') }}</h3>
      <p class="my-3">
        <b>{{ $t('privacyP.purposes') }}</b>
      </p>
      <p class="my-3">{{ $t('privacyP.purposesA') }}<b></b></p>
      <ul class="my-3">
        <li class="li1">{{ $t('privacyP.purposesB') }}</li>
        <li class="li1">{{ $t('privacyP.purposesC') }}</li>
        <li class="li1">
          {{ $t('privacyP.purposesD') }}
        </li>
        <li class="li1">{{ $t('privacyP.purposesE') }}</li>
        <li class="li1">{{ $t('privacyP.purposesF') }}</li>
        <li class="li1">{{ $t('privacyP.purposesG') }}</li>
        <li class="li1">
          {{ $t('privacyP.purposesH') }}
        </li>
      </ul>
      <p class="my-3">
        <b>{{ $t('privacyP.fourthHeader') }}</b>
      </p>
      <p class="my-3">
        {{ $t('privacyP.securityThingA') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.securityThingB') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.securityThingC') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.securityThingD') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.fifthHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutFifthA') }}
      </p>
      <h3 class="my-3">
        {{ $t('privacyP.sixthHeader') }}
      </h3>
      <p class="my-3">
        {{ $t('privacyP.aboutSixthHeader') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.seventhHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutSeventhHeader') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.aboutSeventhHeaderA') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.eightHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutEightHeader') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.ninethHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutNinethHeader') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.tenthHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutTenthHeader') }}
      </p>
      <h3 class="my-3">{{ $t('privacyP.eleventhHeader') }}</h3>
      <p class="my-3">
        {{ $t('privacyP.aboutEleventhHeaderA') }}
      </p>
      <p class="my-3">
        {{ $t('privacyP.aboutEleventhHeaderB') }}
      </p>
      <h3 class="my-3">
        {{ $t('privacyP.twelfthHeader') }}
      </h3>
      <p class="my-3">
        {{ $t('privacyP.aboutTwelfthHeader') }}
      </p>
      <p class="my-3">{{ $t('privacyP.theLast') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  auth: false,
  head() {
    return {
      title: this.$t('pageHead.privacyTitle'),
    }
  },
}
</script>

<style></style>
