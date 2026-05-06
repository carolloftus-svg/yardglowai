import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
const C = {
  bg:         "#0b0e08",
  surface:    "#12160d",
  card:       "#181e10",
  border:     "#252f16",
  glow:       "#d4f04a",
  glowDim:    "#8aab1e",
  glowSoft:   "rgba(212,240,74,0.08)",
  ember:      "#e8883a",
  emberSoft:  "rgba(232,136,58,0.12)",
  text:       "#edf2df",
  muted:      "#6b7a54",
  mutedLight: "#9aac78",
  white:      "#ffffff",
};

// ── PROPERTY DATA SIMULATION ──────────────────────────────────
const PROPERTY_DATA = {
  lotSqft: 5663,
  buildingSqft: 4074,
  get landscapeableSqft() { return this.lotSqft - this.buildingSqft + 490; },
  zone: "9b",
  waterGroup: "Group C",
  frostFreeDays: 255,
  grassBanYear: 2026,
  rebatePerSqft: 5,
  get maxRebate() { return Math.min(this.landscapeableSqft * this.rebatePerSqft, 7945); },
};

// ── STYLES ────────────────────────────────────────────────────
const styles = {
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 0,
  },
};

// ── UTILITY COMPONENTS ────────────────────────────────────────

function GlowOrb({ size, top, left, right, bottom, color, opacity }) {
  return (
    <div style={{
      position: "absolute",
      width: size, height: size,
      borderRadius: "50%",
      background: color || C.glow,
      opacity: opacity || 0.06,
      filter: `blur(${parseInt(size) * 0.4}px)`,
      top, left, right, bottom,
      pointerEvents: "none",
      zIndex: 0,
    }} />
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      display: "inline-block",
      background: color ? `${color}18` : C.glowSoft,
      border: `1px solid ${color ? color + "44" : C.glowDim + "55"}`,
      color: color || C.glow,
      borderRadius: 100,
      padding: "3px 12px",
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    }}>{children}</span>
  );
}

function DataRow({ icon, label, value, highlight }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "12px 0",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 13, color: C.muted, flex: 1 }}>{label}</span>
      <span style={{
        fontSize: 13, fontWeight: 700, fontFamily: "monospace",
        color: highlight ? C.glow : C.text,
      }}>{value}</span>
    </div>
  );
}

// ── SECTION: HERO ─────────────────────────────────────────────
function HeroSection({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "80px 24px 60px",
      textAlign: "center",
    }}>
      <GlowOrb size="600px" top="-100px" left="50%" color={C.glow} opacity={0.07} />
      <GlowOrb size="400px" bottom="0" right="-100px" color={C.ember} opacity={0.08} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        opacity: 0.3,
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
        {/* Logo */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
          marginBottom: 32,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 100,
            padding: "8px 20px 8px 12px",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${C.glow}, ${C.glowDim})`,
              boxShadow: `0 0 16px ${C.glow}66`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>🌿</div>
            <span style={{ fontSize: 15, color: C.text, fontFamily: "'Georgia', serif", letterSpacing: 1 }}>
              YardGlow<span style={{ color: C.glow }}>AI</span>
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s ease 0.15s",
        }}>
          <h1 style={{
            fontSize: "clamp(36px, 7vw, 72px)",
            lineHeight: 1.05,
            fontFamily: "'Georgia', serif",
            fontWeight: 400,
            color: C.text,
            marginBottom: 8,
          }}>
            See your yard
            <br />
            <span style={{
              color: C.glow,
              textShadow: `0 0 40px ${C.glow}55`,
            }}>transformed.</span>
          </h1>
          <p style={{
            fontSize: "clamp(15px, 2.5vw, 19px)",
            color: C.muted,
            lineHeight: 1.65,
            maxWidth: 520,
            margin: "20px auto 0",
          }}>
            AI-powered landscape design for your home, wherever you are.
            Your property data pulled instantly. Your design ready same day.
          </p>
        </div>

        {/* Tags */}
        <div style={{
          display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
          margin: "28px 0 40px",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease 0.3s",
        }}>
          <Tag>Climate-Matched Plant Selection</Tag>
          <Tag color={C.ember}>Local Incentive Finder</Tag>
          <Tag>Same-Day Design Concept</Tag>
        </div>

        {/* CTA */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease 0.45s",
        }}>
          <button onClick={onStart} style={{
            background: C.glow,
            color: C.bg,
            border: "none",
            borderRadius: 14,
            padding: "18px 48px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "monospace",
            letterSpacing: 0.5,
            boxShadow: `0 0 40px ${C.glow}44`,
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = `0 0 60px ${C.glow}66`; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 0 40px ${C.glow}44`; }}
          >
            Design My Yard — It's Free →
          </button>
          <div style={{ marginTop: 14, fontSize: 12, color: C.muted, fontFamily: "monospace" }}>
            No signup · No credit card · Henderson & Las Vegas only
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 32,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        opacity: 0.4,
      }}>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", letterSpacing: 2 }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.glow}, transparent)` }} />
      </div>
    </section>
  );
}

// ── SECTION: HOW IT WORKS ─────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { n: "01", icon: "📍", title: "Enter your address", body: "We instantly pull your lot size, plant zone, water group, and rebate eligibility. No forms to fill." },
    { n: "02", icon: "🎨", title: "Pick your style", body: "Desert Modern, Native Oasis, Lush Garden, or Classic Curb. All 2026 grass-ban compliant." },
    { n: "03", icon: "⚡", title: "See your design", body: "AI generates a concept with a plant list, material spec, and cost estimate — same day." },
    { n: "04", icon: "📞", title: "Book your free consult", body: "Carol from Inspired Outdoor Designs reviews your plan live and locks in your project." },
  ];

  return (
    <section style={{
      padding: "100px 24px",
      maxWidth: 960, margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Tag>How It Works</Tag>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          fontFamily: "'Georgia', serif",
          fontWeight: 400,
          color: C.text,
          marginTop: 16,
          lineHeight: 1.2,
        }}>From address to design<br />in under 60 seconds.</h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 2,
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: i === 0 ? "16px 0 0 16px" : i === 3 ? "0 16px 16px 0" : 0,
            padding: "32px 24px",
            position: "relative",
          }}>
            <div style={{
              fontSize: 11, color: C.glowDim,
              fontFamily: "monospace", letterSpacing: 2,
              marginBottom: 20,
            }}>{s.n}</div>
            <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
            <div style={{ fontSize: 15, color: C.text, fontWeight: 600, marginBottom: 10, fontFamily: "'Georgia', serif" }}>{s.title}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SECTION: LEAD CAPTURE FORM ────────────────────────────────
function LeadCaptureSection({ formRef }) {
  const [address, setAddress] = useState("");
  const [step, setStep] = useState("input"); // input | loading | data | style | booking | done
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loadStep, setLoadStep] = useState(0);

  const loadSteps = [
    "Locating parcel boundaries…",
    "Checking USDA plant zone…",
    "Pulling Henderson water group…",
    "Calculating SNWA rebate…",
    "Done.",
  ];

  const handleLookup = () => {
    if (!address.trim()) return;
    setStep("loading");
    setLoadStep(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLoadStep(i);
      if (i >= loadSteps.length - 1) {
        clearInterval(iv);
        setTimeout(() => setStep("data"), 600);
      }
    }, 700);
  };

  const styles_list = [
    { id: "desert", emoji: "🪨", name: "Desert Modern", desc: "Boulders, gravel, sculptural plants. Zero grass." },
    { id: "oasis", emoji: "🌴", name: "Native Oasis", desc: "Lush feel using only drought-tolerant species." },
    { id: "classic", emoji: "🏡", name: "Classic Curb", desc: "Traditional look, fully rebate-compliant." },
    { id: "zen", emoji: "🌵", name: "Agave Zen", desc: "Minimalist. Structural. Timeless desert." },
  ];

  const handleBook = () => {
    if (!name.trim() || !email.trim()) return;
    setStep("done");
    // In production: POST to Formspree + open Calendly
  };

  return (
    <section ref={formRef} style={{
      padding: "0 24px 120px",
      maxWidth: 680, margin: "0 auto",
    }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Tag>Get Started Free</Tag>
        <h2 style={{
          fontSize: "clamp(26px, 4vw, 40px)",
          fontFamily: "'Georgia', serif",
          fontWeight: 400,
          color: C.text,
          marginTop: 16,
        }}>What's your address?</h2>
        <p style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>
          We pull your property data automatically. No tape measure needed.
        </p>
      </div>

      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
      }}>
        <GlowOrb size="300px" top="-50px" right="-50px" color={C.glow} opacity={0.05} />

        <div style={{ padding: "36px 32px", position: "relative", zIndex: 1 }}>

          {/* STEP: INPUT */}
          {step === "input" && (
            <div>
              <label style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", letterSpacing: 1.5, display: "block", marginBottom: 8 }}>
                HOME ADDRESS
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLookup()}
                  placeholder="e.g. 2120 Havensight Lane, Henderson NV"
                  style={{
                    flex: 1,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    fontSize: 14,
                    color: C.text,
                    outline: "none",
                    fontFamily: "monospace",
                  }}
                />
                <button onClick={handleLookup} style={{
                  background: C.glow, color: C.bg,
                  border: "none", borderRadius: 12,
                  padding: "14px 22px",
                  fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>Look Up →</button>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Lot size auto-pulled", "Plant zone matched", "Rebate calculated"].map(t => (
                  <span key={t} style={{ fontSize: 11, color: C.glowDim, fontFamily: "monospace" }}>✓ {t}</span>
                ))}
              </div>
            </div>
          )}

          {/* STEP: LOADING */}
          {step === "loading" && (
            <div>
              <div style={{ fontSize: 13, color: C.muted, fontFamily: "monospace", marginBottom: 24 }}>
                Looking up <span style={{ color: C.text }}>{address}</span>
              </div>
              {loadSteps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 0",
                  opacity: i <= loadStep ? 1 : 0.2,
                  transition: "opacity 0.3s",
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: i < loadStep ? C.glow : i === loadStep ? C.ember : C.border,
                    boxShadow: i === loadStep ? `0 0 10px ${C.ember}` : "none",
                    transition: "all 0.3s",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: i <= loadStep ? C.text : C.muted, fontFamily: "monospace" }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {/* STEP: DATA */}
          {step === "data" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.glowDim, fontFamily: "monospace", letterSpacing: 2, marginBottom: 4 }}>PROPERTY FOUND</div>
                  <div style={{ fontSize: 18, color: C.text, fontFamily: "'Georgia', serif" }}>Your yard, mapped.</div>
                </div>
                <Tag color={C.glow}>✓ Verified</Tag>
              </div>

              <DataRow icon="📐" label="Landscapeable Area" value={`${PROPERTY_DATA.landscapeableSqft.toLocaleString()} sq ft`} />
              <DataRow icon="🌡️" label="USDA Plant Zone" value={`Zone ${PROPERTY_DATA.zone} — Desert`} />
              <DataRow icon="💧" label="Henderson Water Group" value={PROPERTY_DATA.waterGroup} />
              <DataRow icon="☀️" label="Frost-Free Growing Days" value={`${PROPERTY_DATA.frostFreeDays} days/year`} />
              <DataRow icon="⚠️" label="Grass Ban Deadline" value="End of 2026" highlight />
              <DataRow icon="💰" label="Your SNWA Rebate" value={`Up to $${PROPERTY_DATA.maxRebate.toLocaleString()}`} highlight />

              <div style={{
                background: C.glowSoft,
                border: `1px solid ${C.glowDim}44`,
                borderRadius: 12,
                padding: "14px 16px",
                marginTop: 20,
                marginBottom: 24,
                fontSize: 13,
                color: C.glow,
                lineHeight: 1.55,
              }}>
                🎉 Your grass replacement could be <strong>fully covered</strong> by the SNWA rebate. We'll build a compliant design that maximizes your payout.
              </div>

              <button onClick={() => setStep("style")} style={{
                background: C.glow, color: C.bg,
                border: "none", borderRadius: 12,
                padding: "14px", width: "100%",
                fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "monospace",
              }}>
                This looks right — Pick My Style →
              </button>
            </div>
          )}

          {/* STEP: STYLE */}
          {step === "style" && (
            <div>
              <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", letterSpacing: 2, marginBottom: 6 }}>STEP 2 OF 3</div>
              <div style={{ fontSize: 18, color: C.text, fontFamily: "'Georgia', serif", marginBottom: 6 }}>What's your vibe?</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>All styles are Zone 9b native and 2026 compliant.</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {styles_list.map(s => (
                  <div key={s.id} onClick={() => setSelectedStyle(s.id)} style={{
                    background: selectedStyle === s.id ? C.glowSoft : C.surface,
                    border: `1.5px solid ${selectedStyle === s.id ? C.glow : C.border}`,
                    borderRadius: 14,
                    padding: "16px 14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => selectedStyle && setStep("booking")}
                style={{
                  background: selectedStyle ? C.glow : C.border,
                  color: selectedStyle ? C.bg : C.muted,
                  border: "none", borderRadius: 12,
                  padding: "14px", width: "100%",
                  fontSize: 14, fontWeight: 700,
                  cursor: selectedStyle ? "pointer" : "default",
                  fontFamily: "monospace",
                  transition: "all 0.2s",
                }}>
                {selectedStyle ? `See My ${styles_list.find(s => s.id === selectedStyle)?.name} Design →` : "Select a style to continue"}
              </button>
            </div>
          )}

          {/* STEP: BOOKING */}
          {step === "booking" && (
            <div>
              <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", letterSpacing: 2, marginBottom: 6 }}>STEP 3 OF 3</div>
              <div style={{ fontSize: 18, color: C.text, fontFamily: "'Georgia', serif", marginBottom: 6 }}>Almost there.</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
                We'll send your design concept and book a free 20-min call with Carol to walk through it.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "YOUR NAME", value: name, set: setName, placeholder: "First and last name" },
                  { label: "EMAIL ADDRESS", value: email, set: setEmail, placeholder: "where we send your design" },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", letterSpacing: 1.5, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      value={f.value}
                      onChange={e => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12, padding: "13px 16px",
                        fontSize: 14, color: C.text,
                        outline: "none", fontFamily: "monospace",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* What they get */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", letterSpacing: 1.5, marginBottom: 10 }}>WHAT YOU'LL RECEIVE</div>
                {[
                  "AI design concept for your yard",
                  "Zone 9b plant list (drought-tolerant)",
                  "Estimated project cost with rebate applied",
                  "Free 20-min call with Carol",
                ].map(item => (
                  <div key={item} style={{ fontSize: 12, color: C.mutedLight, padding: "4px 0", fontFamily: "monospace" }}>
                    ✓ {item}
                  </div>
                ))}
              </div>

              <button onClick={handleBook} style={{
                background: C.glow, color: C.bg,
                border: "none", borderRadius: 12,
                padding: "16px", width: "100%",
                fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "monospace",
                boxShadow: `0 0 30px ${C.glow}33`,
              }}>
                Send My Design & Book My Call →
              </button>
              <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 10, fontFamily: "monospace" }}>
                No spam. Unsubscribe anytime.
              </div>
            </div>
          )}

          {/* STEP: DONE */}
          {step === "done" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: C.glowSoft,
                border: `2px solid ${C.glow}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, margin: "0 auto 20px",
                boxShadow: `0 0 30px ${C.glow}44`,
              }}>✓</div>
              <div style={{ fontSize: 22, color: C.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>You're on the list, {name.split(" ")[0]}.</div>
              <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 28 }}>
                Check your inbox — your design concept is on its way.<br />
                Carol will reach out within 24 hours to walk through it.
              </div>
              <div style={{
                background: C.glowSoft, border: `1px solid ${C.glowDim}44`,
                borderRadius: 12, padding: "14px 16px",
                fontSize: 13, color: C.glow,
              }}>
                💰 Based on your property, your estimated SNWA rebate is <strong>${PROPERTY_DATA.maxRebate.toLocaleString()}</strong>. We'll walk through how to claim it on your call.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: SOCIAL PROOF ─────────────────────────────────────
function SocialProofSection() {
  const stats = [
    { value: "Same Day", label: "Design delivery", sub: "vs 2–4 weeks elsewhere" },
    { value: "$0–2k", label: "Net cost after rebate", sub: "for most Henderson yards" },
    { value: "2026", label: "Grass ban compliant", sub: "all designs ready now" },
    { value: "Local", label: "Designer visits your yard", sub: "Inspired Outdoor Designs" },
  ];
  return (
    <section style={{
      padding: "80px 24px",
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 2,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "32px 20px",
            borderRight: i < 3 ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{ fontSize: 28, color: C.glow, fontFamily: "'Georgia', serif", fontWeight: 400, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.text, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SECTION: FOOTER ───────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "40px 24px",
      textAlign: "center",
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${C.glow}, ${C.glowDim})`,
        }} />
        <span style={{ fontSize: 14, color: C.text, fontFamily: "'Georgia', serif" }}>
          YardGlow<span style={{ color: C.glow }}>AI</span>
        </span>
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>
        Powered by Inspired Outdoor Designs · Henderson, Nevada
      </div>
      <div style={{ fontSize: 11, color: C.border, fontFamily: "monospace" }}>
        yardglowai.com · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

// ── NAV ───────────────────────────────────────────────────────
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "14px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? `${C.bg}ee` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${C.glow}, ${C.glowDim})`,
          boxShadow: `0 0 12px ${C.glow}55`,
        }} />
        <span style={{ fontSize: 15, color: C.text, fontFamily: "'Georgia', serif" }}>
          YardGlow<span style={{ color: C.glow }}>AI</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 12, color: C.muted, fontFamily: "monospace", display: "none" }}>Henderson & Las Vegas</span>
        <button onClick={onCTA} style={{
          background: C.glow, color: C.bg,
          border: "none", borderRadius: 10,
          padding: "9px 20px",
          fontSize: 12, fontWeight: 700,
          cursor: "pointer", fontFamily: "monospace",
          letterSpacing: 0.3,
        }}>
          Design My Yard →
        </button>
      </div>
    </nav>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function YardGlowAI() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        input::placeholder { color: ${C.muted}; }
        input:focus { border-color: ${C.glowDim} !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <Nav onCTA={scrollToForm} />
      <HeroSection onStart={scrollToForm} />
      <SocialProofSection />
      <HowItWorksSection />
      <LeadCaptureSection formRef={formRef} />
      <Footer />
    </div>
  );
}
