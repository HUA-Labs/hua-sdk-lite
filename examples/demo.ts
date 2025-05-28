// demo.ts - 실제 API 호출 예제
import { createSession } from '../src/services/session';
import { sendMessage } from '../src/services/message';
import { loadPreset } from '../src/services/preset';

async function main() { // Renamed to main
  console.log("Starting HUA SDK Lite demo...");

  // API Key Check (sendMessage relies on process.env.HUA_API_KEY)
  if (!process.env.HUA_API_KEY || process.env.HUA_API_KEY === '<YOUR_API_KEY_HERE>') {
    console.error("Error: HUA_API_KEY environment variable is not set.");
    console.log("Please set it before running the demo, e.g., HUA_API_KEY=your_key_here npm run demo");
    return;
  }
  console.log("HUA_API_KEY found.");

  try {
    // 1. Create a session
    console.log("\n--- Testing createSession ---");
    const session = await createSession('demo-user-001', {
      tone: 'gentle',
      mode: 'companion',
      tier: 'F2', // Added tier with a sample value
    });
    console.log('[Session Created]', session);

    // 2. Send a message using the session
    console.log("\n--- Testing sendMessage ---");
    const messageText = '요즘 너무 지쳤어... 마음이 복잡해.';
    console.log(`Sending message: "${messageText}" for session ID: ${session.id}`);
    const reply = await sendMessage(session.id, messageText);
    console.log('[Empathic Reply]', reply); // Expected: "🤖 감응 응답: ..."

    // 3. Load presets
    console.log("\n--- Testing loadPreset ---");
    const gentleToneDesc = await loadPreset('tone', 'gentle');
    console.log("[Preset 'tone:gentle']", gentleToneDesc);
    
    const companionModeDesc = await loadPreset('mode', 'companion');
    console.log("[Preset 'mode:companion']", companionModeDesc);

    // 4. Test loading a non-existent preset
    console.log("\n--- Testing loadPreset (error case) ---");
    try {
      const nonExistentPreset = await loadPreset('tone', 'nonexistentkey');
      console.log('[Non-existent Preset]', nonExistentPreset); // Should not reach here
    } catch (error) {
      // Assuming error has a message property
      console.error('[Preset Load Error]', (error as Error).message); // Expected: "존재하지 않는 프리셋입니다"
    }

    // Example of sending another message in the same session
    console.log("\n--- Testing sendMessage (another message) ---");
    const anotherMessage = "조언 고마워. 기분이 한결 나아졌어.";
    console.log(`Sending message: "${anotherMessage}" for session ID: ${session.id}`);
    const anotherReply = await sendMessage(session.id, anotherMessage);
    console.log('[Empathic Reply]', anotherReply);

  } catch (error) {
    // Assuming error has a message property
    console.error('\n[Demo Error]', (error as Error).message);
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
  }
}

main().catch(e => console.error("Critical error in demo:", e));
