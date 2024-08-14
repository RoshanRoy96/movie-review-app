import React from 'react'
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from "../api/configs/tmdb.config";
import { Box } from "@mui/material";
import uiConfigs from '../configs/ui.configs';
import Container from "../components/common/Container";
import MediaSlide from '../components/common/MediaSlide';

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediatype.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="popular movies">
          <MediaSlide mediaType={tmdbConfigs.mediatype.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="popular series">
          <MediaSlide mediaType={tmdbConfigs.mediatype.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediatype.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="top rated series">
          <MediaSlide mediaType={tmdbConfigs.mediatype.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  )
}

export default HomePage