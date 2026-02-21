import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="loader-wrapper">
                <div className="sphere-wrapper">
                    <div className="sphere">
                        <div className="sphere-inner"></div>
                        <div className="orbit orbit-1"></div>
                        <div className="orbit orbit-2"></div>
                        <div className="orbit orbit-3"></div>
                    </div>
                </div>
                <div className="loading-text">SMART SPORTS MS</div>
                <div className="loading-bar-wrapper">
                    <div className="loading-bar"></div>
                </div>
            </div>

            <style>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background: radial-gradient(circle at center, #0a0e14 0%, #000000 100%);
          color: #ffffff;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          perspective: 1000px;
        }

        .sphere-wrapper {
          width: 120px;
          height: 120px;
          margin-bottom: 40px;
          position: relative;
          transform-style: preserve-3d;
        }

        .sphere {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateSphere 4s infinite linear;
        }

        .sphere-inner {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, #00f2ff, #001220);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.4), inset 0 0 20px rgba(0, 242, 255, 0.2);
        }

        .orbit {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(0, 242, 255, 0.3);
          border-radius: 50%;
        }

        .orbit-1 { transform: rotateY(0deg); }
        .orbit-2 { transform: rotateY(60deg); }
        .orbit-3 { transform: rotateY(120deg); }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.5rem;
          margin-bottom: 20px;
          color: #00f2ff;
          text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
          animation: pulseText 2s infinite ease-in-out;
        }

        .loading-bar-wrapper {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00f2ff, transparent);
          animation: loadingMove 1.5s infinite ease-in-out;
        }

        @keyframes rotateSphere {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes pulseText {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes loadingMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
