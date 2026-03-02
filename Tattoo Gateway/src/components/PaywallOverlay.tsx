import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PaywallOverlayProps {
  courseId: string;
  onPurchase: () => void;
}

const PaywallOverlay = ({ courseId: _courseId, onPurchase }: PaywallOverlayProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 bg-[rgba(11,13,16,0.85)] backdrop-blur-sm flex items-center justify-center z-10">
      <div className="text-center px-6 max-w-sm">
        <div className="w-14 h-14 rounded-full bg-[rgba(212,162,74,0.15)] border border-[#D4A24A] flex items-center justify-center mx-auto mb-5">
          <Lock className="w-6 h-6 text-[#D4A24A]" />
        </div>
        <h3 className="font-display text-xl text-[#F2F2F2] mb-2">Preview Ended</h3>
        <p className="text-sm text-[#B8BDC4] mb-6">
          Purchase this course to continue watching the full video.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={onPurchase} className="btn-primary w-full">
            Purchase Course
          </button>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary w-full"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaywallOverlay;
