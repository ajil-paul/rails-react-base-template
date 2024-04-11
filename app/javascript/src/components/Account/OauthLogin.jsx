import React from "react";

import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OauthLogin = () => {
  const { t } = useTranslation();

  const oAuthState = btoa(JSON.stringify({ signup: false }));
  const oAuthGoogleUrl = `/users/auth/google_oauth2?state=${oAuthState}`;
  const oAuthFacebookUrl = `/users/auth/google_oauth2?state=${oAuthState}`;

  return (
    <div>
      <div className="relative mt-10">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="px-6 text-gray-900 bg-white">
            {t("account.orContinueWith")}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <a
          className="flex items-center justify-center w-full gap-3 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          href={oAuthGoogleUrl}
        >
          <FcGoogle size={24} />
          <span className="text-sm font-semibold leading-6">Google</span>
        </a>
        <a
          className="flex items-center justify-center w-full gap-3 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          href={oAuthFacebookUrl}
        >
          <FaFacebook color="#0766ff" size={24} />
          <span className="text-sm font-semibold leading-6">Facebook</span>
        </a>
      </div>
    </div>
  );
};

export default OauthLogin;
