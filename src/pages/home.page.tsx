import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Target, Eye, Medal, ClipboardList,
  HandHeart, Play, BookOpen, Download, FileText,
  Users, Pause
} from 'lucide-react';
import '../styles/home.page.css';

/* ─── Types ─────────────────────────────────────────── */
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoItem {
  id: number;
  title: string;
  youtubeId: string;
  subtitle: string;
}

/* ─── Data ───────────────────────────────────────────── */
const videos: VideoItem[] = [
  { id: 1, title: 'A Powerful Christian Sermon on Following God’s Will (Bisaya)', subtitle: 'Life of Obedience',    youtubeId: '6OsKUdMcQdY' },
  { id: 2, title: 'GIVING BRINGS A RELEASE (FULL SERMON)',         subtitle: 'Giving is not losing — it is releasing heaven’s flow into our lives.', youtubeId: 'akri6Ph541Q' },
  { id: 3, title: 'WHEN BROKEN BEGINNINGS SERVE A PERFECT PLAN',         subtitle: 'Many believers secretly carry silent questions?', youtubeId: 'r0SGqBEA63M'  },
];

/* How many seconds the carousel plays per visit before advancing */
const PREVIEW_SECONDS = 10;
/* After looping all videos once, each return visit plays this many MORE seconds */
const EXTRA_SECONDS_PER_LOOP = 2;   // 3 → 5 → 7 → ... per subsequent full cycle

/* ─── YouTube IFrame API loader ─────────────────────── */
function loadYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) { resolve(); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = resolve;
  });
}

/* ─── Component ──────────────────────────────────────── */
const HomePage = () => {
  /* ── Scroll visibility ── */
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ── Carousel state ── */
  const playerRef       = useRef<YT.Player | null>(null);
  const playerDivId     = 'yt-carousel-player';
  const [activeIdx, setActiveIdx]         = useState(0);
  const [overlayHidden, setOverlayHidden] = useState(false); // user engaged
  const [isPlaying, setIsPlaying]         = useState(false);

  // Tracks how many full loops completed (drives extra preview time)
  const loopCountRef   = useRef(0);
  // Per-video resume positions (seconds) — advances after each preview
  const resumePos      = useRef<number[]>(videos.map(() => 0));
  // Timer refs
  const previewTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnim   = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const autoRef        = useRef(true);   // false once user clicks play

  /* ── Intersection observer ── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.getAttribute('data-section');
            if (key) setVisible(prev => ({ ...prev, [key]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    document.querySelectorAll('[data-section]').forEach(el => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  /* ── Progress bar animation ── */
  const animateProgress = useCallback((durationMs: number) => {
    if (!progressBarRef.current) return;
    const bar = progressBarRef.current;
    bar.style.transition = 'none';
    bar.style.width = '0%';

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / durationMs) * 100, 100);
      bar.style.width = `${pct}%`;
      if (pct < 100) {
        progressAnim.current = requestAnimationFrame(tick);
      }
    };
    progressAnim.current = requestAnimationFrame(tick);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressAnim.current) cancelAnimationFrame(progressAnim.current);
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
  }, []);

  /* ── Preview: seek + play for N seconds then advance ── */
  const startPreview = useCallback((idx: number, player: YT.Player) => {
    if (!autoRef.current) return;

    if (previewTimer.current) clearTimeout(previewTimer.current);
    stopProgress();

    const previewDuration = PREVIEW_SECONDS + loopCountRef.current * EXTRA_SECONDS_PER_LOOP;
    const startSec = resumePos.current[idx];

    player.loadVideoById({ videoId: videos[idx].youtubeId, startSeconds: startSec });
    player.unMute();
    player.setVolume(0);   // muted for autoplay policy compliance; user click unmutes
    player.playVideo();
    setIsPlaying(true);

    animateProgress(previewDuration * 1000);

    previewTimer.current = setTimeout(() => {
      if (!autoRef.current) return;
      // Save resume position (wrap at video duration or cap at 300s)
      resumePos.current[idx] = startSec + previewDuration;

      // Advance to next video
      const nextIdx = (idx + 1) % videos.length;
      if (nextIdx === 0) loopCountRef.current += 1;

      setActiveIdx(nextIdx);
    }, previewDuration * 1000);
  }, [animateProgress, stopProgress]);

  /* ── Init YouTube player ── */
  useEffect(() => {
    let mounted = true;
    loadYTApi().then(() => {
      if (!mounted) return;
      playerRef.current = new window.YT.Player(playerDivId, {
        width: '100%',
        height: '100%',
        videoId: videos[0].youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            if (!mounted || !autoRef.current) return;
            startPreview(0, e.target);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED)  setIsPlaying(false);
          },
        },
      });
    });
    return () => {
      mounted = false;
      if (previewTimer.current)  clearTimeout(previewTimer.current);
      if (progressAnim.current)  cancelAnimationFrame(progressAnim.current);
      playerRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── When activeIdx changes in auto mode, start next preview ── */
  useEffect(() => {
    if (!autoRef.current || !playerRef.current) return;
    startPreview(activeIdx, playerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  /* ── User clicks play → stop carousel, play fully, unmute ── */
  const handleUserPlay = useCallback(() => {
    autoRef.current = false;
    if (previewTimer.current)  clearTimeout(previewTimer.current);
    if (progressAnim.current)  cancelAnimationFrame(progressAnim.current);
    if (progressBarRef.current) progressBarRef.current.style.width = '100%';

    setOverlayHidden(true);

    const player = playerRef.current;
    if (!player) return;
    player.setVolume(100);
    player.unMute();
    player.seekTo(resumePos.current[activeIdx], true);
    player.playVideo();
  }, [activeIdx]);

  /* ── User clicks a dot to jump ── */
  const handleDotClick = useCallback((idx: number) => {
    if (!autoRef.current) {
      // Already in user mode — just switch video
      setActiveIdx(idx);
      resumePos.current[idx] = 0;
      playerRef.current?.loadVideoById({ videoId: videos[idx].youtubeId });
      playerRef.current?.playVideo();
      return;
    }
    setActiveIdx(idx);
  }, []);

  /* ── Toggle pause / resume in user mode ── */
  const handleTogglePlay = useCallback(() => {
    if (!playerRef.current || autoRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  /* ─── render ─────────────────────────────────────────── */
  return (
    <div className="home-page">
      <div className="home-container">

        {/* ── Hero ── */}
        <div className="home-hero">
          <h1>Shelter of Praise</h1>
          <p>
            A community where faith grows, families are strengthened, and lives are
            transformed through God's love.
          </p>
        </div>

        {/* ── Purpose ── */}
        <div
          data-section="purpose"
          className={`home-section home-section--purpose from-left${visible.purpose ? ' visible' : ''}`}
        >
          <div className="section-icon-header">
            <Target size={22} />
            <h2>Purpose</h2>
          </div>
          <h3>Love God, Love People</h3>
          <p>
            Our purpose is simple yet profound: to love God with all our hearts and extend that
            love to every person we encounter. We believe genuine love for God naturally overflows
            into compassionate service to our community, creating bonds that transform lives and
            strengthen our faith together.
          </p>
        </div>

        {/* ── Vision ── */}
        <div
          data-section="vision"
          className={`home-section home-section--vision from-right${visible.vision ? ' visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <div className="section-icon-header">
            <Eye size={22} />
            <h2>Vision</h2>
          </div>
          <h3>Go &amp; Make Disciples</h3>
          <p>
            We envision a church that actively goes beyond its walls to make disciples of all
            nations. Our vision is to equip every believer with the tools and confidence to share
            the Gospel, mentor others in faith, and create a ripple effect of spiritual
            transformation throughout our community and beyond.
          </p>
        </div>

        {/* ── Goal ── */}
        <div
          data-section="goal"
          className={`home-section home-section--goal from-bottom${visible.goal ? ' visible' : ''}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="section-icon-header">
            <Medal size={22} />
            <h2>Goal</h2>
          </div>
          <h3>To Make Every Believer a Leader of Leaders</h3>
          <p>
            Our goal is to nurture and develop every member of our congregation into confident
            leaders who can mentor and guide others. We believe true growth happens when believers
            don't just follow, but become equipped to lead others in their faith journey,
            multiplying our impact exponentially.
          </p>
        </div>

        {/* ── Strategy ── */}
        <div
          data-section="strategy"
          className={`home-section home-section--strategy from-scale${visible.strategy ? ' visible' : ''}`}
          style={{ transitionDelay: '0.45s' }}
        >
          <div className="section-icon-header">
            <ClipboardList size={22} />
            <h2>Strategy</h2>
          </div>
          <h3>Win · Consolidate · Disciple · Send</h3>
          <div className="strategy-grid">
            {[
              { label: 'Win',         desc: 'Reaching souls through evangelism and community outreach programs.' },
              { label: 'Consolidate', desc: 'Strengthening new believers through fellowship and biblical foundation.' },
              { label: 'Disciple',    desc: 'Training believers to grow in faith and spiritual maturity.' },
              { label: 'Send',        desc: 'Commissioning mature believers to lead and minister to others.' },
            ].map(({ label, desc }) => (
              <div key={label} className="strategy-card">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Welcome Hook ── */}
        <div
          data-section="hook"
          className={`home-hook${visible.hook ? ' visible' : ''}`}
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="section-icon-header" style={{ justifyContent: 'center' }}>
            <HandHeart size={24} color="#fff" />
            <h2>Welcome to Our Family</h2>
          </div>
          <p>
            Whether you're seeking spiritual guidance, community fellowship, or simply a place to
            call home, you'll find open arms and warm hearts here. Come as you are, and discover
            the transforming power of God's love in your life.
          </p>
          <button className="home-hook-btn">
            <Users size={16} />
            Join Us This Sunday
          </button>
        </div>

        {/* ── Video Carousel ── */}
        <div
          data-section="video"
          className={`video-carousel-wrap${visible.video ? ' visible' : ''}`}
          style={{ transitionDelay: '0.75s' }}
        >
          {/* YouTube player target */}
          <div id={playerDivId} className={`video-carousel-frame${overlayHidden ? ' user-active' : ''}`} />

          {/* Progress bar */}
          {!overlayHidden && (
            <div className="carousel-progress-bar" ref={progressBarRef} />
          )}

          {/* Overlay — hidden after user clicks play */}
          <div className={`video-carousel-overlay${overlayHidden ? ' hidden' : ''}`}>
            <div
              className="carousel-play-ring"
              onClick={handleUserPlay}
              role="button"
              aria-label="Play video"
            >
              <Play size={28} color="#fff" style={{ marginLeft: 3 }} />
            </div>
            <p className="carousel-title">{videos[activeIdx].title}</p>
            <p className="carousel-subtitle">{videos[activeIdx].subtitle}</p>
            <div className="carousel-dots">
              {videos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${activeIdx === i ? ' active' : ''}`}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Minimal controls shown once user has engaged */}
          {overlayHidden && (
            <div
              style={{
                position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 3,
                display: 'flex', gap: '0.5rem', alignItems: 'center'
              }}
            >
              <button
                onClick={handleTogglePlay}
                style={{
                  background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                  width: 40, height: 40, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', color: '#fff'
                }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <div className="carousel-dots" style={{ marginBottom: 0 }}>
                {videos.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${activeIdx === i ? ' active' : ''}`}
                    onClick={() => handleDotClick(i)}
                    aria-label={`Go to video ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Latest Sermon ── */}
        <div
          data-section="sermon"
          className={`home-section home-section--sermon from-bottom${visible.sermon ? ' visible' : ''}`}
          style={{ transitionDelay: '0.9s' }}
        >
          <div className="section-icon-header">
            <BookOpen size={22} />
            <h2>Latest Sermon</h2>
          </div>
          <div className="sermon-inner">
            <div className="sermon-card">
              <h3>"Walking by Faith, Not by Sight"</h3>
              <p className="sermon-meta">Pastor John Smith &nbsp;·&nbsp; Sunday, August 11, 2025</p>
              <p>
                Discover how to trust God's plan even when the path ahead seems uncertain.
                Learn practical ways to strengthen your faith and find peace in God's promises.
              </p>
              <div className="sermon-actions">
                <button className="sermon-btn sermon-btn--primary">
                  <Play size={15} /> Watch Sermon
                </button>
                <button className="sermon-btn sermon-btn--secondary">
                  <Download size={15} /> Download Audio
                </button>
                <button className="sermon-btn sermon-btn--secondary">
                  <FileText size={15} /> Read Notes
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;