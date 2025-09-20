import { connectDB } from '../db/mongoose.js';
import { User } from '../modules/users/model.js';
import { Note } from '../modules/notes/model.js';
import { RefreshToken } from '../modules/auth/refreshTokenModel.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const SALT_ROUNDS = 12;
const sampleUsers = [
    {
        email: 'demo@example.com',
        password: 'password123',
        name: 'Demo User'
    },
    {
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe'
    },
    {
        email: 'jane@example.com',
        password: 'password123',
        name: 'Jane Smith'
    }
];
const sampleNotes = [
    {
        title: 'Welcome to Notes App',
        body: 'This is your first note! You can create, edit, and organize your thoughts here. Use tags to categorize your notes and make them easier to find.\n\nFeatures:\n- Create and edit notes\n- Tag-based organization\n- Search functionality\n- Responsive design',
        tags: ['welcome', 'getting-started', 'features']
    },
    {
        title: 'Project Ideas',
        body: 'Some ideas for future projects:\n\n- Mobile app for task management\n- Web scraper for news articles\n- AI-powered writing assistant\n- Personal finance tracker\n- Recipe management app\n- Habit tracking system',
        tags: ['projects', 'brainstorming', 'development', 'ideas']
    },
    {
        title: 'Meeting Notes - Q1 Planning',
        body: 'Key points from today\'s planning meeting:\n\n**Objectives:**\n- Focus on user experience improvements\n- Increase development velocity\n- Implement better testing practices\n- Plan for scalability\n\n**Action Items:**\n- [ ] Update documentation\n- [ ] Implement automated testing\n- [ ] Performance optimization\n- [ ] Security audit',
        tags: ['meetings', 'planning', 'work', 'q1']
    },
    {
        title: 'Recipe: Chocolate Chip Cookies',
        body: '**Ingredients:**\n- 2¼ cups all-purpose flour\n- 1 tsp baking soda\n- 1 tsp salt\n- 1 cup butter, softened\n- ¾ cup granulated sugar\n- ¾ cup brown sugar\n- 2 eggs\n- 2 tsp vanilla extract\n- 2 cups chocolate chips\n\n**Instructions:**\n1. Preheat oven to 375°F\n2. Mix dry ingredients in a bowl\n3. Cream butter and sugars\n4. Add eggs and vanilla\n5. Combine wet and dry ingredients\n6. Fold in chocolate chips\n7. Bake for 9-11 minutes\n\nEnjoy! 🍪',
        tags: ['recipes', 'baking', 'desserts', 'cookies']
    },
    {
        title: 'Travel Planning - Europe Trip',
        body: 'Planning a 2-week Europe trip for next summer:\n\n**Destinations:**\n- Paris, France (3 days)\n- Rome, Italy (4 days)\n- Barcelona, Spain (3 days)\n- Amsterdam, Netherlands (2 days)\n- London, UK (2 days)\n\n**Budget:**\n- Flights: $800\n- Accommodation: $1,200\n- Food: $600\n- Activities: $400\n- Total: $3,000\n\n**Must-see attractions:**\n- Eiffel Tower\n- Colosseum\n- Sagrada Familia\n- Anne Frank House\n- Big Ben',
        tags: ['travel', 'europe', 'planning', 'vacation']
    },
    {
        title: 'Learning Goals 2024',
        body: 'My learning objectives for this year:\n\n**Technical Skills:**\n- Master TypeScript and advanced React patterns\n- Learn Next.js and server-side rendering\n- Explore GraphQL and Apollo\n- Get comfortable with Docker and Kubernetes\n- Study system design principles\n\n**Soft Skills:**\n- Improve public speaking\n- Learn project management\n- Enhance leadership abilities\n- Better time management\n\n**Resources:**\n- Online courses and tutorials\n- Books and documentation\n- Practice projects\n- Mentorship opportunities',
        tags: ['learning', 'goals', '2024', 'skills', 'development']
    },
    {
        title: 'Book Recommendations',
        body: 'Books I want to read this year:\n\n**Fiction:**\n- "The Seven Husbands of Evelyn Hugo" by Taylor Jenkins Reid\n- "Project Hail Mary" by Andy Weir\n- "The Midnight Library" by Matt Haig\n- "Klara and the Sun" by Kazuo Ishiguro\n\n**Non-fiction:**\n- "Atomic Habits" by James Clear\n- "The Lean Startup" by Eric Ries\n- "Thinking, Fast and Slow" by Daniel Kahneman\n- "Sapiens" by Yuval Noah Harari\n\n**Technical:**\n- "Clean Code" by Robert Martin\n- "Design Patterns" by Gang of Four\n- "System Design Interview" by Alex Xu',
        tags: ['books', 'reading', 'recommendations', 'learning']
    },
    {
        title: 'Workout Routine',
        body: 'My weekly workout schedule:\n\n**Monday - Upper Body:**\n- Push-ups: 3 sets of 15\n- Pull-ups: 3 sets of 8\n- Dumbbell rows: 3 sets of 12\n- Shoulder press: 3 sets of 10\n\n**Wednesday - Lower Body:**\n- Squats: 3 sets of 20\n- Lunges: 3 sets of 12 each leg\n- Calf raises: 3 sets of 15\n- Glute bridges: 3 sets of 15\n\n**Friday - Cardio:**\n- 30-minute run\n- 15-minute HIIT\n- 10-minute cool-down\n\n**Weekend:**\n- Yoga or stretching\n- Light walk or hike',
        tags: ['fitness', 'workout', 'routine', 'health']
    },
    {
        title: 'Investment Strategy',
        body: 'My investment approach for 2024:\n\n**Portfolio Allocation:**\n- 60% Stock Index Funds (VTI, VXUS)\n- 20% Bond Index Funds (BND)\n- 10% REITs (VNQ)\n- 10% Individual Stocks\n\n**Monthly Contributions:**\n- 401(k): $1,500 (with employer match)\n- Roth IRA: $500\n- Taxable account: $300\n\n**Goals:**\n- Max out 401(k) contributions\n- Build emergency fund (6 months expenses)\n- Save for house down payment\n- Start college fund for kids\n\n**Risk Management:**\n- Diversify across sectors\n- Regular rebalancing\n- Long-term perspective',
        tags: ['finance', 'investing', 'retirement', 'planning']
    },
    {
        title: 'Home Improvement Projects',
        body: 'Home improvement tasks for this year:\n\n**Kitchen Renovation:**\n- [ ] Replace countertops\n- [ ] Update cabinet hardware\n- [ ] Install new backsplash\n- [ ] Upgrade lighting fixtures\n\n**Living Room:**\n- [ ] Paint walls\n- [ ] Replace carpet with hardwood\n- [ ] Add built-in bookshelves\n- [ ] Update furniture\n\n**Outdoor:**\n- [ ] Plant garden\n- [ ] Build deck\n- [ ] Install outdoor lighting\n- [ ] Add privacy fence\n\n**Budget:** $15,000 total',
        tags: ['home', 'renovation', 'projects', 'diy']
    }
];
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');
        // Connect to database
        await connectDB();
        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await Note.deleteMany({});
        await RefreshToken.deleteMany({});
        // Create users
        console.log('👥 Creating users...');
        const createdUsers = [];
        for (const userData of sampleUsers) {
            const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);
            const user = new User({
                email: userData.email,
                passwordHash,
                name: userData.name
            });
            await user.save();
            createdUsers.push(user);
            console.log(`✅ Created user: ${userData.email}`);
        }
        // Create notes for each user
        console.log('📝 Creating notes...');
        for (let i = 0; i < createdUsers.length; i++) {
            const user = createdUsers[i];
            if (!user)
                continue;
            const notesPerUser = Math.ceil(sampleNotes.length / createdUsers.length);
            const startIndex = i * notesPerUser;
            const endIndex = Math.min(startIndex + notesPerUser, sampleNotes.length);
            for (let j = startIndex; j < endIndex; j++) {
                const noteData = sampleNotes[j];
                if (!noteData)
                    continue;
                const note = new Note({
                    ...noteData,
                    ownerId: user._id
                });
                await note.save();
                console.log(`✅ Created note: "${noteData.title}" for ${user.email}`);
            }
        }
        console.log('🎉 Database seeding completed successfully!');
        console.log(`📊 Created ${createdUsers.length} users and ${sampleNotes.length} notes`);
        // Display login credentials
        console.log('\n🔑 Login Credentials:');
        sampleUsers.forEach(user => {
            console.log(`   Email: ${user.email} | Password: ${user.password}`);
        });
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
    }
    finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}
// Run the seeding function
seedDatabase();
//# sourceMappingURL=seed.js.map