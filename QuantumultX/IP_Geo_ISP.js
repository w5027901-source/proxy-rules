/**
 * Quantumult X 节点信息显示
 * 标题：国旗 + 城市
 * 副标题：真实 ISP 运营商
 * 不读取 org 和 as
 */

if (!$response || Number($response.statusCode) !== 200) {
  $done(null);
} else {
  try {
    const data = JSON.parse($response.body || "{}");

    if (data.status === "fail") {
      $done(null);
    } else {
      const country = valueOr(data.country, "未知国家或地区");
      const region = valueOr(data.regionName, "未知地区");
      const city = valueOr(data.city, region);
      const isp = valueOr(data.isp, "未知运营商");
      const ip = valueOr(data.query, "");
      const flag = countryCodeToFlag(data.countryCode);

      const title = flag + " " + city;
      const subtitle = isp;

      const description = [
        "国家或地区: " + country,
        "地区: " + region,
        "城市: " + city,
        "运营商: " + isp,
        "IP: " + ip
      ].join("\n");

      $done({ title, subtitle, ip, description });
    }
  } catch (error) {
    $done(null);
  }
}

function valueOr(value, fallback) {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;
}

function countryCodeToFlag(countryCode) {
  if (
    typeof countryCode !== "string" ||
    !/^[A-Za-z]{2}$/.test(countryCode)
  ) {
    return "🌐";
  }

  const code = countryCode.toUpperCase();

  return String.fromCodePoint(
    code.charCodeAt(0) + 127397,
    code.charCodeAt(1) + 127397
  );
}
