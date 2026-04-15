const handleShare = (text, surah, nomor) => {
  const shareText = `"${text}" - (QS. ${surah}: ${nomor})`;
  if (navigator.share) {
    navigator.share({ title: 'QureX Share', text: shareText, url: window.location.href });
  } else {
    navigator.clipboard.writeText(shareText);
    alert('Teks disalin ke clipboard!');
  }
};

<div className="flex gap-2 mt-4">
  <button 
    onClick={() => dispatch(toggleBookmark({ id: `${detailSurah.nomor}:${ayat.nomorAyat}`, data: ayat }))}
    className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
  >
    🔖
  </button>
  <button 
    onClick={() => dispatch(setLastRead({ surah: detailSurah.namaLatin, nomor: detailSurah.nomor, ayat: ayat.nomorAyat }))}
    className="p-2 hover:bg-blue-50 rounded-lg text-xs"
  >
    Set Last Read
  </button>
  <button 
    onClick={() => handleShare(ayat.teksIndonesia, detailSurah.namaLatin, ayat.nomorAyat)}
    className="p-2 hover:bg-amber-50 rounded-lg"
  >
    📤 Share
  </button>
</div>