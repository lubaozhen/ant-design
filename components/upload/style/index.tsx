// deps-lint-skip-all
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

interface UploadToken extends DerivativeToken {
  uploadPrefixCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<UploadToken> = token => {
  const { uploadPrefixCls } = token;

  return {
    [uploadPrefixCls]: {
      ...resetComponent(token),
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const UploadToken: UploadToken = {
    ...token,
    uploadPrefixCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(UploadToken, hashId),
    ]),
    hashId,
  ];
}
