// src/types/youtube.d.ts
// Type declarations for the YouTube IFrame Player API.
// Fixes: "Cannot find name 'YT'" and "Cannot find namespace 'YT'"
//
// Install the official package instead if you prefer:
//   npm install --save-dev @types/youtube
// Then delete this file — the package provides the same types.

declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED     =  0,
    PLAYING   =  1,
    PAUSED    =  2,
    BUFFERING =  3,
    CUED      =  5,
  }

  interface PlayerVars {
    autoplay?        : 0 | 1;
    mute?            : 0 | 1;
    controls?        : 0 | 1 | 2;
    modestbranding?  : 0 | 1;
    rel?             : 0 | 1;
    playsinline?     : 0 | 1;
    start?           : number;
    end?             : number;
    loop?            : 0 | 1;
    fs?              : 0 | 1;
    cc_load_policy?  : 0 | 1;
    iv_load_policy?  : 1 | 3;
    origin?          : string;
  }

  interface PlayerOptions {
    width?      : number | string;
    height?     : number | string;
    videoId?    : string;
    playerVars? : PlayerVars;
    events?     : {
      onReady?       : (event: PlayerEvent) => void;
      onStateChange? : (event: OnStateChangeEvent) => void;
      onError?       : (event: OnErrorEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent {
    target : Player;
    data   : PlayerState;
  }

  interface OnErrorEvent {
    target : Player;
    data   : number;
  }

  interface LoadVideoByIdOptions {
    videoId      : string;
    startSeconds?: number;
    endSeconds?  : number;
  }

  class Player {
    constructor(elementOrId: HTMLElement | string, options: PlayerOptions);

    // Playback controls
    playVideo()  : void;
    pauseVideo() : void;
    stopVideo()  : void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;

    // Load
    loadVideoById(videoIdOrOptions: string | LoadVideoByIdOptions, startSeconds?: number): void;
    cueVideoById (videoIdOrOptions: string | LoadVideoByIdOptions, startSeconds?: number): void;

    // Volume
    mute()              : void;
    unMute()            : void;
    isMuted()           : boolean;
    setVolume(volume: number): void;
    getVolume()         : number;

    // State / info
    getPlayerState()    : PlayerState;
    getCurrentTime()    : number;
    getDuration()       : number;
    getVideoUrl()       : string;
    getVideoEmbedCode() : string;

    // Lifecycle
    destroy(): void;
  }
}

// Extend the global Window interface so window.YT and
// window.onYouTubeIframeAPIReady are recognised everywhere.
interface Window {
  YT                      : typeof YT;
  onYouTubeIframeAPIReady : () => void;
}